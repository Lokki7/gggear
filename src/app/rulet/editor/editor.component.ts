import { Component, OnInit } from '@angular/core';
import {itemsClassNames, RuletItem} from '../rulet-item';
import {DomSanitizer} from '@angular/platform-browser';
import {RuletService} from '../rulet.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public items: RuletItem[] = [];
  public classNames = itemsClassNames;
  public displayedColumns = ['title', 'className', 'buttons'];

  public password: string = '';
  private stream: string;

  constructor(private route: ActivatedRoute, private ruletService: RuletService) {
    this.route.params.subscribe(({stream}) => this.loadData(stream));
  }

  delete(deleteItem) {
    this.items = this.items.filter(item => item != deleteItem);
  }

  add() {
    this.items = [...this.items, new RuletItem()];
  }

  async save() {
    let data = JSON.stringify(this.items);

    try {
      await this.ruletService.saveData(this.stream, this.password, data);
      alert('Успешно');
    } catch (e) {
      alert(e.message);
    }

  }

  async loadData(stream: string) {
    this.stream = stream;
    this.items = await this.ruletService.getData(stream);
  }

  ngOnInit() {
  }

}


