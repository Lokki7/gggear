import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {GgdjComponent} from './ggdj/ggdj.component';
import {RouterModule, Routes} from '@angular/router';
import {GgdjModule} from './ggdj/ggdj.module';
import {MainpageComponent} from './mainpage/mainpage.component';
import {MainpageModule} from './mainpage/mainpage.module';
import { RuletComponent } from './rulet/rulet.component';


const appRoutes: Routes = [
  {path: '', component: MainpageComponent, pathMatch: 'full'},
  {path: 'dj/:stream', component: GgdjComponent},
  {path: 'rulet/:stream', component: RuletComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    RuletComponent
  ],
  imports: [
    BrowserModule,
    GgdjModule,
    MainpageModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
