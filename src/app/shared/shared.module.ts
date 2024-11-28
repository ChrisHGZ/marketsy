import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { AddProductComponent } from './components/add-product/add-product.component';



@NgModule({
  declarations: [
    CustomInputComponent,
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    AddProductComponent
  ],

  exports: [
    CustomInputComponent,
    LogoComponent,
    HeaderComponent,
    ReactiveFormsModule,
    FooterComponent,
    AddProductComponent
  ],

  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
