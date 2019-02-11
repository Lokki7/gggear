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
  public showCounter = false;
  public showText = '';

  public items: RuletItem[] = [];
  public left: SafeStyle = this.sanitiler.bypassSecurityTrustStyle('-100px');
  public animationClass = "animation1";
  public ruletPrice = 500;
  public sum = 0;

  private stream: string;

  constructor(private route: ActivatedRoute,
              private sanitiler: DomSanitizer,
              private ruletService: RuletService,
              private chatService: GgchatService,
              private apiService: GgapiService) {

    this.route.params.subscribe(({stream}) => this.connectChat(stream));

    this.route.queryParams
      .subscribe(params => {
        if (params.test) {
          this.loadData();
        }
      });

    this.sum = this.ruletService.loadSum();
  }

  async connectChat(stream) {
    this.stream = stream;
    let streamData = await this.apiService.getStream(stream);

    this.chatService.connect(streamData.id);
    this.chatService.$payment.subscribe(data => this.onPayment(data));
  }

  async onPayment({user, message, amount}) {
    // if (amount < 500) return;

    if(user == 'lokki7' && message.indexOf('!say')===0) {
      this.showText = message.substring(5);
    }

    this.sum += Math.round(amount);

    if(this.sum >= this.ruletPrice) {
      this.loadData();
      this.sum -= this.ruletPrice;
    } else {
      this.showCounter = true;
      setTimeout(() => {
        this.showText = '';
        this.showCounter = false;
      }, 5000);
    }

    this.ruletService.saveSum(this.sum);
  }

  scroll() {
    this.left = this.sanitiler.bypassSecurityTrustStyle('-9207px');
  }

  async loadData() {
    let items = await this.ruletService.getData(this.stream);
    this.items = this.generateRuletItems(items);
    this.showRulet = true;

    this.animationClass = 'animation' + (Math.ceil(Math.random()*3));
    // (new Audio('/assets/rulet/sound.mp3')).play();

    setTimeout(() => this.scroll(), 1000);
    setTimeout(() => this.resetAnimation(), 21000);
  }

  resetAnimation() {
    this.showRulet = false;
    setTimeout(() => {
      this.left = this.sanitiler.bypassSecurityTrustStyle('-100px');
    }, 1000);
  }

  generateRuletItems(items: RuletItem[]) {
    let ret = [];
    items = this.convertChances(items);

    for (let i = 0; i < 40; i++) {
      let item = this.getNextItem(items);
      ret.push(item);
    }

    return ret;
  }

  convertChances(items: RuletItem[]) {
    let sum = items.reduce((sum, item) => sum + (item.chance || 1), 0);
    items.forEach(item => item.chance = (item.chance || 1) / sum);

    return items;//.sort((a, b) => a.chance - b.chance);
  }

  getNextItem(items: RuletItem[]): RuletItem {
    let random = Math.random();
    let sum = 0;

    for (let i = 0; i < items.length; i++) {
      sum += items[i].chance;
      if (sum > random) {
        return items[i];
      }
    }
  }

  // countItems(ret) {
  //   let result = {};
  //
  //   ret.forEach(item => {
  //     if (!result[item.title]) result[item.title] = 0;
  //     result[item.title]++;
  //   });
  //
  // }

  ngOnInit() {
  }

}
