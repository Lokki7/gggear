import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class GgchatService {
  private ws: WebSocket;
  private stream: Number;
  public $payment: Subject<any> = new Subject();

  constructor() {}

  connect(stream: Number) {
    this.stream = stream;
    this.ws = new WebSocket('wss://chat.goodgame.ru/chat2/');
    this.ws.addEventListener('message', msg => this.onWsMessage(msg));
  }

  onWsMessage(msg: MessageEvent) {
    let msgData: any;
    try {
      msgData = JSON.parse(msg.data);
    } catch (e) {
      console.log(e);
      return;
    }

    switch (msgData.type) {
      case 'welcome':
        this.join();
        break;
      case 'payment':
        this.onPayment(msgData.data);
        break;
    }
  }

  join() {
    this.send('join', {'channel_id': this.stream});
  }

  onPayment({amount, message, userName, total}) {
    if(total) return false;
    this.$payment.next({user: userName, message, amount: +amount});
  }

  send(type, data) {
    this.ws.send(JSON.stringify({type, data}));
  }

}
