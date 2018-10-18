import { Component } from '@angular/core';

import { RentalYieldComponent } from '../about/rental-yield.component';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RentalYieldComponent;
  tab3Root = ContactPage;

  constructor() {

  }
}
