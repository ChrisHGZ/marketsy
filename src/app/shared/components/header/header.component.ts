import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  utilsSvc = inject(UtilsService)


  @Input() title!: string;
  @Input() isModal!: boolean;

  isLoggedIn: boolean = true;
  isAuthPage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAuthPage = ['/auth', '/register', '/profile', 'isModal' ].includes(this.router.url);
      }
    });
  }

  logout() {
    console.log('Cerrando sesión...');
    this.isLoggedIn = false;
    this.router.navigate(['/auth']);
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
  }

  dismissModal() {
    this.utilsSvc.dismissModal();
  }
}
