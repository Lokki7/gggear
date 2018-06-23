import {Component, OnInit} from '@angular/core';
import {DjQueueService} from '../dj-queue.service';
import {DjTrack} from '../dj-track';

declare var YT: any;

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  private isPlaying = false;
  private player: any;

  constructor(private queueService: DjQueueService) {
    // TODO: Ugly hack :(
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    queueService.events$.subscribe(eventName => this.onQueueEvent(eventName));
  }

  onQueueEvent(eventName) {
    if (eventName == 'new_track' && !this.isPlaying) {
      this.startNext();
    }

    if (eventName == 'skip') {
      this.startNext();
    }
  }

  async createPlayer() {
    return new Promise(resolve => {
      this.player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: '',
        events: {
          'onReady': event => resolve(),
          'onStateChange': event => this.onPlayerStateChange(event)
        }
      });
    })
  }

  ngOnInit() {
    // this.videos.subscribe(videoId => {
    //   this.queue.push(videoId);
    //   this.startNext();
    // });
  }

  async startNext() {
    if (!this.player) await this.createPlayer();
    this.youtubeStart(this.queueService.shift());
  }

  youtubeStart(track: DjTrack) {
    this.isPlaying = true;

    if (track && track.id) {
      this.player.loadVideoById(track.id);
    } else {
      this.player.stopVideo();
    }
  }

  onPlayerStateChange(event) {
    if (event.data == 0) {
      this.isPlaying = false;
      this.startNext();
    }
  }

}
