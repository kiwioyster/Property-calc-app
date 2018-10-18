import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

@Component({
  selector: 'mortgage-cost-component',
  templateUrl: 'mortgage-cost.component.html'
})
export class MortgageCostComponent {

  rent: string;
  price: string;
  rentNumber: number;
  priceNumber: number;
  outputYieldValue = '-- %';
  rentFrequencyValue = 'Month';
  currencyMask = createNumberMask({
    prefix: '$ ',
    includeThousandsSeparator: true
  })

  constructor(public navCtrl: NavController) {

  }

  priceOnChange() {
    console.log(this.price)
    this.priceNumber = this.convertCurrencyToNumber(this.price);
    this.calcRentalYield();
  }

  rentOnChange() {
    this.rentNumber = this.convertCurrencyToNumber(this.rent);
    this.calcRentalYield();
  }

  private calcRentalYield() {
    this.outputYieldValue = '-- %';
    if (this.rentNumber > 0 && this.priceNumber > 0) {
      let calculatedYield: number;
      if (this.rentFrequencyValue === 'Week') {
        calculatedYield = this.rentNumber * 5200 / this.priceNumber;
      } else {
        calculatedYield = this.rentNumber * 1200 / this.priceNumber;
      }
      if (calculatedYield < 100) {
        this.outputYieldValue = `${calculatedYield.toFixed(2)}%`;
      }
    }
  }

  private convertCurrencyToNumber(currency: string): number {
    return Number(currency.replace('$', '').replace(/,/g, ''));
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
