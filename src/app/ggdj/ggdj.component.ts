import {Component, OnInit} from '@angular/core';
import {GgchatService} from '../ggchat/ggchat.service';
import {ActivatedRoute} from '@angular/router';
import {GgapiService} from '../ggapi/ggapi.service';
import {Subject} from 'rxjs';

// const amountLimit = 30;
const regexp = /^.*http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?.*$/;

@Component({
  selector: 'app-ggdj',
  templateUrl: './ggdj.component.html',
  styleUrls: ['./ggdj.component.css']
})
export class GgdjComponent implements OnInit {
  public videos: Subject<any> = new Subject();
  public limit: Number = 100;
  public timeLimit: Number = 600;

  constructor(private route: ActivatedRoute, private chatService: GgchatService, private apiService: GgapiService) {
    this.route.params.subscribe(({stream}) => this.connectChat(stream));
  }

  ngOnInit() {}

  testVideo() {
    this.videos.next('2LCqVYQOGlw');
  }

  async connectChat(stream) {
    let streamData = await this.apiService.getStream(stream);

    this.chatService.connect(streamData.id);
    this.chatService.$payment.subscribe(data => this.onPayment(data));
  }

  onPayment({user, message, amount}) {
    console.log(user, message, amount, this.limit);
    if(amount < this.limit) return;

    if(message.match(regexp)) {
      let videoId = message.replace(regexp, '$1');
      console.log('Found video:', videoId);
      this.videos.next(videoId);
    }

    if(message == 'скип') {

    }

  }

}
