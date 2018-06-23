import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DjSettingsService {
  public limit: number = 100;
  public timeLimit: number = 10;

  constructor() {
    this.load();
  }

  save() {
    localStorage.setItem('ggdj-settings', JSON.stringify({limit: this.limit, timeLimit: this.timeLimit}));
  }

  load() {
    let settingsJson = localStorage.getItem('ggdj-settings');
    let settings = {limit: 100, timeLimit: 10};
    try {
      settings = JSON.parse(settingsJson) || settings;
    } catch (e) {
    }

    this.limit = settings.limit || 100;
    this.timeLimit = settings.timeLimit || 10;
  }

}
