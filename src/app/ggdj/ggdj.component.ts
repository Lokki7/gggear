import {Component, OnInit} from '@angular/core';
import {GgchatService} from '../ggchat/ggchat.service';
import {ActivatedRoute} from '@angular/router';
import {GgapiService} from '../ggapi/ggapi.service';
import {DjQueueService} from './dj-queue.service';
import {YoutubeService} from './youtube.service';
import {DjSettingsService} from './settings/dj-settings.service';

@Component({
  selector: 'app-ggdj',
  templateUrl: './ggdj.component.html',
  styleUrls: ['./ggdj.component.scss']
})
export class GgdjComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private chatService: GgchatService,
    private apiService: GgapiService,
    private djQueue: DjQueueService,
    private youtubeService: YoutubeService,
    private settingsService: DjSettingsService
  ) {
    this.route.params.subscribe(({stream}) => this.connectChat(stream));
  }

  ngOnInit() {}

  async testVideo() {
    let track = await this.youtubeService.getTrackById('RDfjXj5EGqI');
    track.price = 30;
    track.user = 'Анон';

    this.djQueue.addTrack(track);
  }

  skipVideo() {
    this.djQueue.skip();
  }

  async connectChat(stream) {
    let streamData = await this.apiService.getStream(stream);

    this.chatService.connect(streamData.id);
    this.chatService.$payment.subscribe(data => this.onPayment(data));
  }

  async onPayment({user, message, amount}) {
    // console.log(user, message, amount, this.settingsService.limit);
    if (amount < this.settingsService.limit) return;

    if (this.youtubeService.isYoutubeLink(message)) {
      let track = await this.youtubeService.getTrackByLink(message);
      track.price = amount;
      track.user = user;

      if(track.duration > this.settingsService.timeLimit * 60) {
        console.log('too long');
        return;
      }

      this.djQueue.addTrack(track);
    }

    if (message.toLocaleLowerCase() == 'скип' || message.toLocaleLowerCase() == 'skip') {
      let currentTrack = this.djQueue.currentTrack;
      if (currentTrack.price <= amount * 2) {
        this.djQueue.skip();
      }
    }

  }

}
