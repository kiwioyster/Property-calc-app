import { Component } from '@angular/core';

import { RentalYieldComponent } from '../rental-yield/rental-yield.component';
import { MortgageCostComponent } from '../mortgage-cost/mortgage-cost.component';

@Component({
  templateUrl: 'tabs.html',
  styles: [`
  .keyboard-is-open .tabbar {
    display: none;
  }`,

    `.keyboard-is-open .scroll-content {
    margin-bottom: 0 !important;
  }
  `]
})
export class TabsPage {

  tab1Root = RentalYieldComponent;
  tab2Root = MortgageCostComponent;

  constructor() {

  }

  ionViewDidEnter() {
    window.addEventListener('keyboardWillShow', this.showListener);
    window.addEventListener('keyboardDidHide', this.hideListener);
  }

  ionViewWillLeave() {
    window.removeEventListener('keyboardWillShow', this.showListener);
    window.removeEventListener('keyboardDidHide', this.hideListener);
  }

  showListener() {
    console.log('keyboard visible');
    document.getElementById('TabBarOpen').classList.add('keyboard-is-open');
  }
  hideListener() {
    console.log('keyboard hides');
    document.getElementById('TabBarOpen').classList.remove('keyboard-is-open');
  }
}
