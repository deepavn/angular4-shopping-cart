
import { ModuleWithProviders, NgModule, Pipe, PipeTransform } from '@angular/core';

import { RouterModule, ActivatedRoute, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { CartItemsComponent } from './cart-items.component';
import { CartQuantityComponent } from './cart-quantity.component';

import { CartService } from "./cart.service"

const cartRouting: ModuleWithProviders = RouterModule.forChild([
  { path: 'cart', component: CartItemsComponent },
  { path: 'cartItem-quantity', component: CartQuantityComponent }
]);

@NgModule({
  imports: [
    SharedModule,
    cartRouting
  
  ],
  declarations: [
    CartItemsComponent, CartQuantityComponent
  ],
  providers: [CartService]
})
export class CartModule { }