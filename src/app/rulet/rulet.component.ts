import {Component, OnInit} from '@angular/core';
import {RuletItem} from './rulet-item';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {RuletService} from './rulet.service';
import {GgchatService} from '../ggchat/ggchat.service';
import {GgapiService} from '../ggapi/ggapi.service';


@Component({
  selector: 'app-rulet',
  templateUrl: './rulet.component.html',
  styleUrls: ['./rulet.component.scss']
})
export class RuletComponent implements OnInit {
  public showRulet = false;
  public items: RuletItem[] = [];
  public left: SafeStyle = this.sanitiler.bypassSecurityTrustStyle('-100px');

  private stream: string;

  constructor(private route: ActivatedRoute,
              private sanitiler: DomSanitizer,
              private ruletService: RuletService,
              private chatService: GgchatService,
              private apiService: GgapiService) {

    this.route.params.subscribe(({stream}) => this.connectChat(stream));
  }

  async connectChat(stream) {
    this.stream = stream;
    let streamData = await this.apiService.getStream(stream);

    this.chatService.connect(streamData.id);
    this.chatService.$payment.subscribe(data => this.onPayment(data));
  }

  async onPayment({user, message, amount}) {
    if (amount < 30) return;
    this.loadData();
  }

  scroll() {
    this.left = this.sanitiler.bypassSecurityTrustStyle('-9207px');
  }

  async loadData() {
    let items = await this.ruletService.getData(this.stream);
    this.items = this.generateRuletItems(items);
    this.showRulet = true;

    setTimeout(() => this.scroll(), 1000);
    setTimeout(() => this.showRulet = false, 10000);
  }

  generateRuletItems(items: RuletItem[]) {
    let ret = [];

    for (let i = 0; i < 40; i++) {
      let item = items[Math.floor(Math.random() * items.length)];
      ret.push(item);
    }

    return ret;
  }

  ngOnInit() {}

}
