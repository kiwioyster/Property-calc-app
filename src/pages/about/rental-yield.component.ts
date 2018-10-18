import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'rental-yield-component',
  templateUrl: 'rental-yield.component.html'
})
export class RentalYieldComponent {
  rent: number;
  price: number;
  outputYieldValue = '-- %';
  rentFrequencyValue = 'Month';

  constructor(public navCtrl: NavController) {

  }

  calcRentalYield() {
    this.outputYieldValue = '-- %';
    if (this.rent > 0 && this.price > 0) {
      let calculatedYield: number;
      if (this.rentFrequencyValue === 'Week') {
        calculatedYield = this.rent * 5200 / this.price;
      } else {
        calculatedYield = this.rent * 1200 / this.price;
      }
      if (calculatedYield < 100) {
        this.outputYieldValue = `${calculatedYield.toFixed(2)}%`;
      }
    }
  }

  rentFrequency(value: string) {
    if (value === 'weekly') {
      this.rentFrequencyValue = 'Week';
    } else if (value === 'monthly') {
      this.rentFrequencyValue = 'Month';
    }
    this.calcRentalYield();
  }
}
