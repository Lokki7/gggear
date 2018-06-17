import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GgapiService} from './ggapi.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class GgapiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GgapiModule,
      providers: [GgapiService]
    };
  }
}
