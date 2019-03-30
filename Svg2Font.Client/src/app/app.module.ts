import { BrowserModule } from '@angular/platform-browser';
import { NgModule,} from '@angular/core';
import { AppComponent } from './app.component';
import { SvgService } from 'src/services/svg.service';
import { HttpClientModule } from '@angular/common/http';
import { UploadModule } from '@progress/kendo-angular-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { ButtonModule } from '@progress/kendo-angular-buttons';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpClientModule, UploadModule, BrowserAnimationsModule, NotificationModule, ButtonModule
  ],
  providers: [SvgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
