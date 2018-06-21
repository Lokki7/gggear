import {Component, OnInit, Sanitizer} from '@angular/core';
import {RuletItem} from './rulet-item';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

const classNames = ['gold', 'rate', 'weird', 'simple'];

@Component({
  selector: 'app-rulet',
  templateUrl: './rulet.component.html',
  styleUrls: ['./rulet.component.scss']
})
export class RuletComponent implements OnInit {
  public items: RuletItem[] = [];
  public left: SafeStyle;

  constructor(private sanitiler: DomSanitizer) {
    for(let i = 0; i < 40; i++) {
      let item = new RuletItem();
      item.title = 'Выключить стрим';
      item.className = classNames[Math.floor(Math.random() * classNames.length)];

      this.items.push(item);
    }

    this.left = this.sanitiler.bypassSecurityTrustStyle('-100px');
  }

  scroll() {
    this.left = this.sanitiler.bypassSecurityTrustStyle('-9207px');
  }

  ngOnInit() {
  }

}
