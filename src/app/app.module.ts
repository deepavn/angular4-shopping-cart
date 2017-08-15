import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Routing Modules */
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
 
/* Feature Modules */
import { HomeModule, HomeComponent } from './home'
import { ProductModule, ProductHomeComponent } from './products'
import { CartModule } from './cart/cart.module'
import { CartReducer } from './cart/cart.reducer';
import { CartCountReducer } from './cart/cart-count.reducer';
import { AppComponent } from './app.component'

/* NGRX State Management Modules */
import { StoreModule } from '@ngrx/store';

let RootReducer = {
  TheCart: CartReducer,
  TheCartCount: CartCountReducer
}

/* App Root */


export const ROUTES: Routes = [
  {
    path: 'settings',
    loadChildren: './products/product.module#ProductModule'
  }
];



@NgModule({

  declarations: [AppComponent],
  imports: [
    BrowserModule
    , HomeModule
    , ProductModule
    , CartModule
    , StoreModule.forRoot(RootReducer)
    , RouterModule.forRoot(ROUTES)

  ],

  exports: [],

  providers: [],

  bootstrap: [HomeComponent]
})

export class AppModule {

}
