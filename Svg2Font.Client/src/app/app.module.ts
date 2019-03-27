import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UploaderModule  } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, UploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
