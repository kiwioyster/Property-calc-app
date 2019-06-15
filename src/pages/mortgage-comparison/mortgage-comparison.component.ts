import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'mortgage-comparison-component',
  templateUrl: 'mortgage-comparison.component.html'
})
export class MortgageComparisonComponent {
  downPayment: string;
  downPaymentPercent: string;
  price: string;
  interestRateOne: string;
  interestRateTwo: string;
  loanTerm: string;

  downPaymentNumber: number;
  downPaymentPercentNumber: number;
  priceNumber: number;
  interestRateOneNumberPerMonth: number;
  interestRateTwoNumberPerMonth: number;
  numberOfMonthlyPayments: number;

  paymentFrequency = 'monthly';
  lastChangedDownPayment = 'price';

  calculatePaymentValue: number;
  currencyMask = createNumberMask({
    prefix: '$ ',
    includeThousandsSeparator: true,
    allowLeadingZeroes: true
  });

  percentageMask = createNumberMask({
    prefix: '',
    suffix: ' %',
    allowDecimal: true,
    includeThousandsSeparator: false,
    allowLeadingZeroes: true
  });

  yearsMask = createNumberMask({
    prefix: '',
    suffix: ' Years',
    allowDecimal: true,
    includeThousandsSeparator: false,
    allowLeadingZeroes: true
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

  interestRateOneOnChange() {
    this.interestRateOneNumberPerMonth =
      this.convertPercentageToNumber(this.interestRateOne) / 1200;
    this.calcRentalYield();
  }

  interestRateTwoOnChange() {
    this.interestRateTwoNumberPerMonth =
      this.convertPercentageToNumber(this.interestRateTwo) / 1200;
    this.calcRentalYield();
  }

  loanTermOnChange() {
    this.numberOfMonthlyPayments = this.convertDurationToNumberOfMonthlyPayments(
      this.loanTerm
    );
    this.calcRentalYield();
  }

  inputOnBlur() {
    if (typeof this.priceNumber === 'number') {
      this.price = this.priceNumber.toString();
    }
    if (typeof this.downPaymentNumber === 'number') {
      this.downPayment = this.downPaymentNumber.toString();
    }
    if (typeof this.downPaymentPercentNumber === 'number') {
      this.downPaymentPercent = this.downPaymentPercentNumber.toString();
    }
    if (typeof this.interestRateOneNumberPerMonth === 'number') {
      this.interestRateOne = (
        this.interestRateOneNumberPerMonth * 1200
      ).toString();
    }
    if (typeof this.interestRateTwoNumberPerMonth === 'number') {
      this.interestRateTwo = (
        this.interestRateTwoNumberPerMonth * 1200
      ).toString();
    }
    if (typeof this.numberOfMonthlyPayments === 'number') {
      this.loanTerm = (this.numberOfMonthlyPayments / 12).toString();
    }
  }

  private calcRentalYield() {
    this.calculatePaymentValue = undefined;
    if (
      this.priceNumber > 0 &&
      this.downPaymentNumber >= 0 &&
      this.downPaymentNumber <= this.priceNumber &&
      this.interestRateOneNumberPerMonth > 0 &&
      this.interestRateTwoNumberPerMonth > 0 &&
      this.numberOfMonthlyPayments > 0
    ) {
      const p = this.priceNumber - this.downPaymentNumber;
      const rOne = this.interestRateOneNumberPerMonth;
      const rTwo = this.interestRateTwoNumberPerMonth;
      const n = this.numberOfMonthlyPayments;
      const aOne = Math.pow(1 + rOne, n);
      const aTwo = Math.pow(1 + rTwo, n);

      const calculatedPaymentOne = (p * (rOne * aOne)) / (aOne - 1);
      const calculatedPaymentTwo = (p * (rTwo * aTwo)) / (aTwo - 1);

      if (
        calculatedPaymentOne > 0 &&
        calculatedPaymentOne <= p &&
        calculatedPaymentTwo > 0 &&
        calculatedPaymentTwo <= p
      ) {
        if (this.paymentFrequency === 'monthly') {
          this.calculatePaymentValue = Math.abs(
            Math.round(calculatedPaymentOne - calculatedPaymentTwo)
          );
        } else if (this.paymentFrequency === 'weekly') {
          this.calculatePaymentValue = Math.abs(
            Math.round((calculatedPaymentOne - calculatedPaymentTwo) * 0.23077)
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

  private convertDurationToNumberOfMonthlyPayments(duration: string): number {
    return Number(duration.replace('Years', '')) * 12;
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
