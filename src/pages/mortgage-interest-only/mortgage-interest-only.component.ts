import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'mortgage-interest-only-component',
  templateUrl: 'mortgage-interest-only.component.html'
})
export class MortgageInterestOnlyComponent {
  downPayment: string;
  downPaymentPercent: string;
  price: string;
  interestRate: string;

  downPaymentNumber: number;
  downPaymentPercentNumber: number;
  priceNumber: number;
  interestRateNumberPerMonth: number;

  paymentFrequency = 'monthly';
  lastChangedDownPayment = 'price';

  calculatePaymentValue: number;
  currencyMask = createNumberMask({
    prefix: '$ ',
    includeThousandsSeparator: true
  });

  percentageMask = createNumberMask({
    prefix: '',
    suffix: ' %',
    allowDecimal: true
  });

  yearsMask = createNumberMask({
    prefix: '',
    suffix: ' Years',
    allowDecimal: true
  });

  constructor(public navCtrl: NavController) {}

  paymentFrequencyChange(value: string) {
    this.paymentFrequency = value;
    this.calcRentalYield();
  }

  priceOnChange() {
    this.priceNumber = this.convertCurrencyToNumber(this.price);
    if (
      this.lastChangedDownPayment === 'percent' &&
      this.downPaymentPercentNumber >= 0
    ) {
      this.updateDownPaymentValue(
        this.downPaymentPercentNumber,
        this.priceNumber
      );
    } else if (
      this.lastChangedDownPayment === 'price' &&
      this.priceNumber > 0
    ) {
      this.updateDownPaymentPercentValue(
        this.downPaymentNumber,
        this.priceNumber
      );
    }
    this.calcRentalYield();
  }

  downPaymentOnChange() {
    this.lastChangedDownPayment = 'price';
    this.downPaymentNumber = this.convertCurrencyToNumber(this.downPayment);
    if (this.priceNumber > 0) {
      this.updateDownPaymentPercentValue(
        this.downPaymentNumber,
        this.priceNumber
      );
    }
    this.calcRentalYield();
  }

  downPaymentPercentOnChange() {
    this.lastChangedDownPayment = 'percent';
    this.downPaymentPercentNumber = this.convertPercentageToNumber(
      this.downPaymentPercent
    );
    this.updateDownPaymentValue(
      this.downPaymentPercentNumber,
      this.priceNumber
    );
    this.calcRentalYield();
  }

  interestRateOnChange() {
    this.interestRateNumberPerMonth =
      this.convertPercentageToNumber(this.interestRate) / 1200;
    this.calcRentalYield();
  }

  // loanTermOnChange() {
  //   this.numberOfMonthlyPayments = this.convertDurationToNumberOfMonthlyPayments(
  //     this.loanTerm
  //   );
  //   this.calcRentalYield();
  // }

  private calcRentalYield() {
    this.calculatePaymentValue = undefined;
    if (
      this.priceNumber > 0 &&
      this.downPaymentNumber >= 0 &&
      this.downPaymentNumber <= this.priceNumber &&
      this.interestRateNumberPerMonth > 0
    ) {
      const p = this.priceNumber - this.downPaymentNumber;
      const r = this.interestRateNumberPerMonth;
      // const n = this.numberOfMonthlyPayments
      // const a = Math.pow(1 + r, n);

      const calculatedMonthlyPayment = p * r;

      if (calculatedMonthlyPayment > 0 && calculatedMonthlyPayment <= p) {
        if (this.paymentFrequency === 'monthly') {
          this.calculatePaymentValue = Math.round(calculatedMonthlyPayment);
        } else if (this.paymentFrequency === 'weekly') {
          this.calculatePaymentValue = Math.round(
            calculatedMonthlyPayment * 0.23077
          );
        }
      }
    }
  }

  private convertCurrencyToNumber(currency: string): number {
    return Number(currency.replace('$', '').replace(/,/g, ''));
  }

  private convertPercentageToNumber(percentage: string): number {
    return Number(percentage.replace('%', ''));
  }

  private updateDownPaymentValue(downPaymentPercentNumber, priceNumber): void {
    this.downPaymentNumber = Math.round(
      (downPaymentPercentNumber * priceNumber) / 100
    );
    this.downPayment = `$ ${this.downPaymentNumber}`;
  }

  private updateDownPaymentPercentValue(downPaymentNumber, priceNumber): void {
    this.downPaymentPercentNumber = Math.round(
      (downPaymentNumber * 100) / priceNumber
    );
    this.downPaymentPercent = `${this.downPaymentPercentNumber} %`;
  }
}
