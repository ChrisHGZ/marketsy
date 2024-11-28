import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';  // For redirection
import { NavController } from '@ionic/angular';  // For navigation
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {

  UtilsSvc = inject(UtilsService);

  isEditing = false;  // Toggle edit mode
 

  constructor(private navController: NavController, private router: Router) {}

  // Toggle between editing and saving
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Save the changes (implement this logic if needed)
    }
  }

  user(): User{
    return this.UtilsSvc.getFromLocalStorage('user');
  }

  


  // Logout and redirect to home
  logout() {
    // Logic for logging out (clear session, remove token, etc.)
    console.log('Logged out');

    // Redirect to home page
    this.router.navigate(['/auth']);  // Adjust the path as needed
  }
}