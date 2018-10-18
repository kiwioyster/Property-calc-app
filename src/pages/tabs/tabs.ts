import { Component } from '@angular/core';

import { RentalYieldComponent } from '../rental-yield/rental-yield.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RentalYieldComponent;
  tab2Root = RentalYieldComponent;

  constructor() {

  }
}
