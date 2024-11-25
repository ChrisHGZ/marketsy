import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot,UrlTree,CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

 firebaseSvc= inject(FirebaseService)
 utilsSvc= inject(UtilsService)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user = localStorage.getItem('user');

      return new Promise(resolve => {
        this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
          
          if(auth){
           if (user) resolve(true)
          else{
            this.utilsSvc.routerLink('/auth')
            resolve(false)

          }
        }
        })
      });
  }
}