import {Injectable} from '@angular/core';

const apiUrl = 'http://195.9.195.13:3000/rulet/';

@Injectable({
  providedIn: 'root'
})

export class RuletService {
  constructor() {
  }

  async getData(streamer: string) {
    let res = await fetch(apiUrl + streamer);
    return await res.json();
  }

  async saveData(streamer, password, data) {
    let res = await fetch(apiUrl + streamer, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, data})
    });

    let answer = await res.json();

    if (!answer.result) {
      throw new Error(answer.message);
    }

    return true;
  }

  saveSum(value) {
    localStorage.setItem('gggear-rulet-sum', value);
  }

  loadSum() {
    return +localStorage.getItem('gggear-rulet-sum');
  }
}
