import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GgdjComponent} from './ggdj.component';
import {RouterModule} from '@angular/router';
import {GgchatModule} from '../ggchat/ggchat.module';
import {GgapiModule} from '../ggapi/ggapi.module';
import {YoutubeComponent} from './youtube/youtube.component';
import {FormsModule} from '@angular/forms';
import {QueueComponent} from './queue/queue.component';


import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { SettingsComponent } from './settings/settings.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    GgchatModule.forRoot(),
    GgapiModule.forRoot(),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  declarations: [GgdjComponent, YoutubeComponent, QueueComponent, SettingsComponent]
})
export class GgdjModule {
}
