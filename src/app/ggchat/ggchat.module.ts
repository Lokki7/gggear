import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GgchatService} from './ggchat.service';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class GgchatModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GgchatModule,
      providers: [GgchatService]
    };
  }
}
