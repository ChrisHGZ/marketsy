import { Component, OnInit } from '@angular/core';
import { inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent  implements OnInit {

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
  })

  FirebaseSvc = inject(FirebaseService)
  UtilsSvc = inject(UtilsService)
  user = {} as User

  ngOnInit() {
    this.user = this.UtilsSvc.getFromLocalStorage('user');
  }

  async takeImage() {
    const dataUrl = (await this.UtilsSvc.takePicture('Imagen del Producto')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  async submit() {
    if (this.form.valid) {

      let path = `users/${this.user.uid}/products`

      const loading = await this.UtilsSvc.loading()
      await loading.present()


      //======== Upload Image y obtener url

      /*let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.FirebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);*/

      delete this.form.value.id

      this.FirebaseSvc.addDocument(path, this.form.value).then(async res => {

        this.UtilsSvc.dismissModal({ sucess: true });

        this.UtilsSvc.toast({
          message: 'Producto creado con exito',
          duration: 3000,
          color: 'success',
          icon: 'checkmark-circle-outline',
          position: 'middle'
        })


      }).catch(error => {
        console.log(error);

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
