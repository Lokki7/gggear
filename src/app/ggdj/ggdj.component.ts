import {Component, OnInit} from '@angular/core';
import {GgchatService} from '../ggchat/ggchat.service';
import {ActivatedRoute} from '@angular/router';
import {GgapiService} from '../ggapi/ggapi.service';
import {DjQueueService} from './dj-queue.service';
import {YoutubeService} from './youtube.service';

@Component({
  selector: 'app-ggdj',
  templateUrl: './ggdj.component.html',
})
export class GgdjComponent implements OnInit {
  public limit: Number = 100;
  public timeLimit: Number = 600;

  constructor(
    private route: ActivatedRoute,
    private chatService: GgchatService,
    private apiService: GgapiService,
    private djQueue: DjQueueService,
    private youtubeService: YoutubeService
  ) {
    this.route.params.subscribe(({stream}) => this.connectChat(stream));
  }

  ngOnInit() {
  }

  async testVideo() {

    console.log(this.youtubeService.getVideoId('https://www.youtube.com/watch?t=4m48s&v=fCT1tgeM_Fw&feature=youtu.be'));



    // let track = await this.youtubeService.getTrackById('RDfjXj5EGqI');
    // track.price = 30;
    // track.user = 'Анон';
    //
    // this.djQueue.addTrack(track);
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
    console.log(user, message, amount, this.limit);

    if (amount < this.limit) return;

    if (this.youtubeService.isYoutubeLink(message)) {
      let track = await this.youtubeService.getTrackByLink(message);
      track.price = amount;
      track.user = user;

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
