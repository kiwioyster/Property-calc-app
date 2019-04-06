import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RentalYieldComponent } from '../rental-yield/rental-yield.component';
import { MortgageCostComponent } from '../mortgage-cost/mortgage-cost.component';
import { MortgageComparisonComponent } from '../mortgage-comparison/mortgage-comparison.component';
import { MortgageInterestOnlyComponent } from '../mortgage-interest-only/mortgage-interest-only.component';

@Component({
  selector: 'page-main',
  templateUrl: 'main.component.html'
})
export class MainPage {
  private rootPage;
  private rentalYieldPage;
  private mortgageCostPage;
  private mortgageCompPage;
  private mortgageIntOnlyPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rootPage = RentalYieldComponent;
    this.rentalYieldPage = RentalYieldComponent;

    this.mortgageCostPage = MortgageCostComponent;
    this.mortgageCompPage = MortgageComparisonComponent;
    this.mortgageIntOnlyPage = MortgageInterestOnlyComponent;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  openPage(p) {
    this.rootPage = p;
  }
}
