
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent, FooterComponent } from '../shared/layout';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  imports: [
    CommonModule, RouterModule 
  ],
  declarations: [HeaderComponent, FooterComponent],
  exports: [
    HeaderComponent, FooterComponent,
    CommonModule, FormsModule
  ]
  ,providers:[]
})
export class SharedModule {

}