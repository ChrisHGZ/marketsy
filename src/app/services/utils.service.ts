import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  LoadingCtrl = inject(LoadingController)
  toastCtrl = inject(ToastController)
  router = inject(Router)
  modalCtrl = inject(ModalController)

  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una Imagen',
      promptLabelPicture: 'Tomar Foto',
    });
  }






  loading() {
    return this.LoadingCtrl.create({
      spinner: 'crescent',
      message: 'Cargando...',
    })
  }

  async toast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts)
    toast.present();

  }

  routerLink(url: string) {
    return this.router.navigateByUrl(url)
  }

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))

  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }


  // MODAL
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();

     return data;
  }

  dismissModal(data?: any) {
    return this.modalCtrl.dismiss(data);
  }


}