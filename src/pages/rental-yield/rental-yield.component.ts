import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'rental-yield-component',
  templateUrl: 'rental-yield.component.html'
})
export class RentalYieldComponent {
  rent: string;
  price: string;
  expense: string;

  rentNumber: number;
  priceNumber: number;
  expenseNumber: number = 0;

  grossPrefix = 'Gross';

  outputYieldValue = '-- %';
  rentFrequencyValue = 'Month';
  currencyMask = createNumberMask({
    prefix: '$ ',
    includeThousandsSeparator: true,
    allowLeadingZeroes: true
  });

  constructor(public navCtrl: NavController) {}

  priceOnChange() {
    this.priceNumber = this.convertCurrencyToNumber(this.price);
    this.calcRentalYield();
  }

  rentOnChange() {
    this.rentNumber = this.convertCurrencyToNumber(this.rent);
    this.calcRentalYield();
  }

  expenseOnChange() {
    if (!this.expense || this.expense === '$ 0') {
      this.grossPrefix = 'Gross';
    } else {
      this.grossPrefix = 'Net';
    }
    this.expenseNumber = this.convertCurrencyToNumber(this.expense);
    this.calcRentalYield();
  }

  inputOnBlur() {
    if (typeof this.priceNumber === 'number') {
      this.price = this.priceNumber.toString();
    }
    if (typeof this.rentNumber === 'number') {
      this.rent = this.rentNumber.toString();
    }
    if (typeof this.expenseNumber === 'number') {
      this.expense = this.expenseNumber.toString();
    }
  }

  private calcRentalYield() {
    this.outputYieldValue = '-- %';
    if (this.rentNumber > 0 && this.priceNumber > 0) {
      let calculatedYield: number;
      if (this.rentFrequencyValue === 'Week') {
        calculatedYield =
          (100 * (this.rentNumber * 52 - this.expenseNumber)) /
          this.priceNumber;
      } else {
        calculatedYield =
          (100 * (this.rentNumber * 12 - this.expenseNumber)) /
          this.priceNumber;
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
