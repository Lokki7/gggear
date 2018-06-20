import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GgdjComponent} from './ggdj.component';
import {RouterModule} from '@angular/router';
import {GgchatModule} from '../ggchat/ggchat.module';
import {GgapiModule} from '../ggapi/ggapi.module';
import {YoutubeComponent} from './youtube/youtube.component';
import {FormsModule} from '@angular/forms';
import {QueueComponent} from './queue/queue.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    GgchatModule.forRoot(),
    GgapiModule.forRoot()
  ],
  declarations: [GgdjComponent, YoutubeComponent, QueueComponent]
})
export class GgdjModule {
}
