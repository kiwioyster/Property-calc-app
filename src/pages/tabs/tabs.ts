import { Component } from '@angular/core';

import { RentalYieldComponent } from '../rental-yield/rental-yield.component';
import { MortgageCostComponent } from '../mortgage-cost/mortgage-cost.component';

@Component({
  templateUrl: 'tabs.html',
  styleUrls: ['tabs.scss']
})
export class TabsPage {
  tab1Root = RentalYieldComponent;
  tab2Root = MortgageCostComponent;

  constructor() {

  }

  ionViewDidEnter() {
    window.addEventListener('keyboardDidShow', this.showListener);
    window.addEventListener('keyboardDidHide', this.hideListener);
  }

  ionViewWillLeave() {
    window.removeEventListener('keyboardDidShow', this.showListener);
    window.removeEventListener('keyboardDidHide', this.hideListener);
  }

  showListener() {
    document.getElementById('TabBarOpen').classList.add('keyboard-is-open');
  }
  hideListener() {
    document.getElementById('TabBarOpen').classList.remove('keyboard-is-open');
  }
}
