// import { Component } from '@angular/core';

// import { RentalYieldComponent } from '../rental-yield/rental-yield.component';
// import { MortgageCostComponent } from '../mortgage-cost/mortgage-cost.component';

// @Component({
//   selector: 'tabs',
//   templateUrl: 'tabs.html'
// })
// export class TabsPage {
// tab1Root = RentalYieldComponent;
// tab2Root = MortgageCostComponent;
// constructor() {}
// ionViewDidEnter() {
//   window.addEventListener('keyboardDidShow', this.showListener);
//   window.addEventListener('keyboardDidHide', this.hideListener);
// }
// ionViewWillLeave() {
//   window.removeEventListener('keyboardDidShow', this.showListener);
//   window.removeEventListener('keyboardDidHide', this.hideListener);
// }
// showListener() {
//   document.getElementById('TabBarOpen').classList.add('keyboard-is-open');
// }
// hideListener() {
//   document.getElementById('TabBarOpen').classList.remove('keyboard-is-open');
// }
// }

// import { Component } from '@angular/core';
// import { MenuController } from 'ionic-angular';

// @Component({
//   selector: 'tabs',
//   templateUrl: 'tabs.html'
// })
// export class TabsPage {
//   constructor(public menuCtrl: MenuController) {}

//   openMenu() {
//     this.menuCtrl.open();
//   }
// }
