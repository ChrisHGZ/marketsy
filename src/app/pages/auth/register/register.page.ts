import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form = new FormGroup({
    uid: new FormControl(''),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

FirebaseSvc = inject(FirebaseService)
UtilsSvc = inject(UtilsService)

  ngOnInit() {

  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.UtilsSvc.loading()
       await loading.present()

      this.FirebaseSvc.register(this.form.value as User).then(async res => {

        await this.FirebaseSvc.updateUser(this.form.value.username);
        
        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid)

        this.setUserInfo(uid)

        this.UtilsSvc.toast({
          message: 'Cuenta creada con exito',
          duration: 3000,
          color: 'success',
          icon: 'checkmark-circle-outline',
          position: 'middle'
        })
      }).catch(error => {
        this.UtilsSvc.toast({
          message: error.message,
          duration: 3000,
          color: 'danger',
          icon: 'close-circle-outline',
          position: 'middle'
        })

      }).finally(() => {
        loading.dismiss()
      })


    }
  }


  async setUserInfo(uid : string) {
    if (this.form.valid) {
      const loading = await this.UtilsSvc.loading()
       await loading.present()
       let path = `/users/${uid}`
       delete this.form.value.password;

      
      this.FirebaseSvc.setDocument(path, this.form.value).then(async res => {

        this.UtilsSvc.saveInLocalStorage('user', this.form.value) 
        this.UtilsSvc.routerLink('/home')
        this.form.reset()
       
      }).catch(error => {
        this.UtilsSvc.toast({
          message: error.message,
          duration: 3000,
          color: 'danger',
          icon: 'close-circle-outline',
          position: 'middle'
        })

      }).finally(() => {
        loading.dismiss()
      })


    }
  }



}
