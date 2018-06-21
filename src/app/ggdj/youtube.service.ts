import {Injectable} from '@angular/core';
import {DjTrack} from './dj-track';

const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&key=AIzaSyCwc7GrN9gc3RTEOnXi5RtFCREQm04TrcY&id=`;
const regexp = /^.*http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?.*v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?.*$/;

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor() {

  }

  isYoutubeLink(link: string) {
    return !!link.match(regexp);
  }

  getVideoId(link: string) {
    return link.replace(regexp, '$1');
  }

  async getTrackByLink(link: string): Promise<DjTrack> {
    let videoId = this.getVideoId(link);
    return this.getTrackById(videoId);
  }

  async getTrackById(id: string) {
    let track = new DjTrack();
    track.id = id;

    let resp = await fetch(apiUrl + id);
    let data = await resp.json();

    if (data.items.length && data.items[0].snippet) {
      let snippet = data.items[0].snippet;
      let contentDetails = data.items[0].contentDetails;

      track.title = snippet.title;
      track.duration = this.convertDuration(contentDetails.duration);
    }

    return track;
  }

  convertDuration(input) {
    let reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    let hours = 0, minutes = 0, seconds = 0, totalseconds;

    if (reptms.test(input)) {
      let matches = reptms.exec(input);
      if (matches[1]) hours = Number(matches[1]);
      if (matches[2]) minutes = Number(matches[2]);
      if (matches[3]) seconds = Number(matches[3]);
      totalseconds = hours * 3600 + minutes * 60 + seconds;
    }
    //let withZero = (num) => num > 10 ? num : '0' + num;
    //withZero(hours) + ':' + withZero(minutes) + ':' + withZero(seconds);

    return totalseconds;
  }


}
