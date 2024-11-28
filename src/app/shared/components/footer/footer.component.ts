import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {}

  activeTab: string = 'home';

  navigateToHome() {
    this.activeTab = 'home';
    this.router.navigate(['/home']);
  }

  navigateToMarketplace() {
    this.activeTab = 'market';
    this.router.navigate(['/market']);
  }

  navigateToSeller() {
    this.activeTab = 'seller';
    this.router.navigate(['/seller']);
  }

  navigateToProfile() {
    this.activeTab = 'profile';
    this.router.navigate(['/profile']);
  }


}
