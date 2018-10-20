import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

@Component({
  selector: 'mortgage-cost-component',
  templateUrl: 'mortgage-cost.component.html'
})
export class MortgageCostComponent {

  downPayment: string;
  price: string;
  interestRate: string;
  loanDuration: string;

  downPaymentNumber: number;
  priceNumber: number;
  interestRateNumberPerMonth: number;
  numberOfMonthlyPayments: number;

  paymentFrequence = 'monthly';

  calculatePaymentValue: number;
  currencyMask = createNumberMask({
    prefix: '$ ',
    includeThousandsSeparator: true
  });

  percentageMask = createNumberMask({
    prefix: '',
    suffix: ' %',
    allowDecimal: true
  })

  yearsMask = createNumberMask({
    prefix: '',
    suffix: ' Years',
    allowDecimal: true
  })

  constructor(public navCtrl: NavController) {

  }

  priceOnChange() {
    this.priceNumber = this.convertCurrencyToNumber(this.price);
    this.calcRentalYield();
  }

  downPaymentOnChange() {
    this.downPaymentNumber = this.convertCurrencyToNumber(this.downPayment);
    this.calcRentalYield();
  }

  interestRateOnChange() {
    this.interestRateNumberPerMonth = this.convertPercentageToNumber(this.interestRate);
    this.calcRentalYield();
  }

  loanDurationOnChange() {
    this.numberOfMonthlyPayments = this.convertDurationTonumberOfMonthlyPayments(this.loanDuration);
    this.calcRentalYield();
  }

  private calcRentalYield() {
    this.calculatePaymentValue = undefined;
    if (this.priceNumber > 0 &&
      this.downPaymentNumber > 0 &&
      this.downPaymentNumber < this.priceNumber &&
      this.interestRateNumberPerMonth > 0 &&
      this.numberOfMonthlyPayments > 0) {

      const p = this.priceNumber - this.downPaymentNumber;
      const r = this.interestRateNumberPerMonth;
      const n = this.numberOfMonthlyPayments
      const a = Math.pow(1 + r, n);

      const calculatedPayment = p * (r * a) / (a - 1);

      if (calculatedPayment > 0 && calculatedPayment <= p) {
        if (this.paymentFrequence === 'monthly') {
          this.calculatePaymentValue = Math.round(calculatedPayment);
        } else if (this.paymentFrequence === 'weekly') {
          this.calculatePaymentValue = Math.round(calculatedPayment * 0.23077);
        }
      }
    }
  }

  private convertCurrencyToNumber(currency: string): number {
    return Number(currency.replace('$', '').replace(/,/g, ''));
  }

  private convertPercentageToNumber(percentage: string): number {
    return Number(percentage.replace('%', '')) / 1200;
  }

  private convertDurationTonumberOfMonthlyPayments(duration: string): number {
    return Number(duration.replace('Years', '')) * 12;
  }

  paymentFrequencyChange(value: string) {
    this.paymentFrequence = value;
    this.calcRentalYield();
  }

}
