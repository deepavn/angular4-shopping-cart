import { Component, OnInit, ViewContainerRef, Directive, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { CartService } from './cart.service'
import { CartQuantityComponent } from './cart-quantity.component'

import { Store } from '@ngrx/store';
import { AppState } from '../core/app-state'
import { CartReducer } from './cart.reducer'
import { CartItem } from './cart-item.model'
import { Cart } from './cart.model';
 

@Component({
    selector: 'cart-items',
    // template: '<h1>asa</h1>'
    templateUrl: './cart-items.html' 
})

export class CartItemsComponent implements OnInit {
    parentShopItem:CartItem

    slist$: Observable<AppState>
    slist: Cart
   

    constructor(private _cartservice: CartService, private store: Store<AppState>) {
        this.slist = this._cartservice.getCart()
    }
    reset() {
        this._cartservice.reset();
         this.slist = this._cartservice.getCart()
    }

    ngOnInit(): void {
        
        this.slist = this._cartservice.getCart()
    }

    increment() {

    }

    remove(myCItem: CartItem) {
        this._cartservice.deleteItem(myCItem)
         this.slist = this._cartservice.getCart()
    }

}
