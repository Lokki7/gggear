import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DjTrack} from './dj-track';

@Injectable({
  providedIn: 'root'
})
export class DjQueueService {
  public queue: DjTrack[] = [];
  public currentTrack: DjTrack;
  public events$: Subject<string> = new Subject();

  constructor() {

  }

  sort() {
    this.queue = this.queue.sort((a, b) => b.price - a.price);
  }

  shift(): DjTrack {
    this.currentTrack = this.queue.shift();
    this.events$.next('next_track');
    return this.currentTrack;
  }

  addTrack(track: DjTrack) {
    this.queue.push(track);
    // console.log(this.queue);
    this.sort();
    this.events$.next('new_track');
  }

  skip() {
    this.events$.next('skip');
  }

}
