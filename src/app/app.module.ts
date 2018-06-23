import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {GgdjComponent} from './ggdj/ggdj.component';
import {RouterModule, Routes} from '@angular/router';
import {GgdjModule} from './ggdj/ggdj.module';
import {MainpageComponent} from './mainpage/mainpage.component';
import {MainpageModule} from './mainpage/mainpage.module';
import {RuletComponent} from './rulet/rulet.component';
import {EditorComponent} from './rulet/editor/editor.component';
import {FormsModule} from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';


const appRoutes: Routes = [
  {path: '', component: MainpageComponent, pathMatch: 'full'},
  {path: 'dj/:stream', component: GgdjComponent},
  {path: 'rulet/:stream', component: RuletComponent},
  {path: 'rulet/:stream/editor', component: EditorComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    RuletComponent,
    EditorComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    GgdjModule,
    MainpageModule,
    MatTableModule,
    MatInputModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
