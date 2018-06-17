import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GgapiService {

  constructor() {

  }

  async getStream(stream: String) {
    // TODO: HTTPClient
    let fetchResult = await fetch('https://goodgame.ru/api/4/stream/' + stream);
    let streamData = await fetchResult.json();

    return streamData;
  }

}
