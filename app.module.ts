import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { PagerService } from './_services/index';
import { FilterPipe } from './filter.pipe';
import { AppComponent } from './app.component';
import { OrderByPipe } from './order-by.pipe';


@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
     HttpModule,
        FormsModule
  ],
  providers: [
     PagerService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }





