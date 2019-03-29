import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { RentalYieldComponent } from '../pages/rental-yield/rental-yield.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TextMaskModule } from 'angular2-text-mask';
import { MortgageCostComponent } from '../pages/mortgage-cost/mortgage-cost.component';
import { MainPage } from '../pages/main/main.component';

@NgModule({
  declarations: [MyApp, RentalYieldComponent, MortgageCostComponent, MainPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), TextMaskModule],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RentalYieldComponent,
    MortgageCostComponent,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
