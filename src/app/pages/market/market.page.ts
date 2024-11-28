import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products.models';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit{



  firebaseSvc = inject(FirebaseService);
  UtilsSvc = inject(UtilsService);

  products: Product[] = [];

  ngOnInit() {
    this.getProducts();
  }
  user(): User{
    return this.UtilsSvc.getFromLocalStorage('user');
  }

  // obtener productos

  getProducts() {
    let path = `users/${this.user().uid}/products`;

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;
        sub.unsubscribe();  
      }
    })


 }
}