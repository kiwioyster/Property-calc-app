import { Component } from '@angular/core';

import { RentalYieldComponent } from '../rental-yield/rental-yield.component';
import { MortgageCostComponent } from '../mortgage-cost/mortgage-cost.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RentalYieldComponent;
  tab2Root = MortgageCostComponent;

  constructor() {

  }
}
