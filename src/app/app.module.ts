import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpService } from './http.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    TableModule,
    CalendarModule,
    FormsModule,
    ToasterModule.forRoot()
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
