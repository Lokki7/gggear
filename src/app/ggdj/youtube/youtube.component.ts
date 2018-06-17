import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

declare var YT: any;

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  @Input() videos: Subject<string>;
  public queue = [];
  private isPlaying = false;
  private player: any;

  constructor() {
    // TODO: Ugly hack :(
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  }

  async createPlayer() {
    return new Promise(resolve => {
      this.player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: '',
        events: {
          'onReady': event => resolve(),
          'onStateChange': event => this.onPlayerStateChange(event)
        }
      });
    })
  }

  ngOnInit() {
    this.videos.subscribe(videoId => {
      this.queue.push(videoId);
      this.startNext();
    });
  }

  async startNext() {
    if(!this.player) await this.createPlayer();

    // console.log('start next', this.queue.length);

    if (this.isPlaying || this.queue.length == 0) return false;
    this.youtubeStart(this.queue.shift());
  }

  youtubeStart(videoId) {
    this.isPlaying = true;
    this.player.loadVideoById(videoId);
  }

  onPlayerStateChange(event) {
    if (event.data == 0) {
      this.isPlaying = false;
      this.startNext();
    }
  }

}
