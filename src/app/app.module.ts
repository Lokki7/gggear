import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {GgdjComponent} from './ggdj/ggdj.component';
import {RouterModule, Routes} from '@angular/router';
import {GgdjModule} from './ggdj/ggdj.module';
import {MainpageComponent} from './mainpage/mainpage.component';
import {MainpageModule} from './mainpage/mainpage.module';


const appRoutes: Routes = [
  {path: '', component: MainpageComponent, pathMatch: 'full'},
  {path: 'dj/:stream', component: GgdjComponent},
];


@NgModule({
  declarations: [
    AppComponent
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
