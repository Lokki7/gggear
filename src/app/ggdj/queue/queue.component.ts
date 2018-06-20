import {Component, OnInit} from '@angular/core';
import {DjQueueService} from '../dj-queue.service';
import {DjTrack} from '../dj-track';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html'
})
export class QueueComponent implements OnInit {
  public tracks: DjTrack[] = [];
  public totalDuration = 0;

  constructor(private queueService: DjQueueService) {
    this.tracks = this.queueService.queue;

    this.queueService.events$.subscribe(() => {
      this.totalDuration = this.queueService.queue.reduce((sum, track) => sum + track.duration, 0);
    });
  }

  ngOnInit() {
  }

}
