import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {DjSettingsService} from './dj-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit, OnChanges, DoCheck {
  constructor(public settingsService: DjSettingsService) {
  }

  ngOnChanges() {
  }

  ngDoCheck() {
    this.settingsService.save();
  }


  ngOnInit() {
  }
}
