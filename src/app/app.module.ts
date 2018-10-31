import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { HttpModule } from '@angular/http';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
    


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    //BrowserAnimationsModule,
    HttpModule
  //  ToastModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

