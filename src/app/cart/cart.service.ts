import { Injectable, Inject } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Store, StoreModule } from '@ngrx/store';

import { LoadState, SaveState } from '../shared/local-storage'
import { AppState } from '../core/app-state'
import { Cart } from './cart.model'
import { CartItem } from './cart-item.model'

import { ADDCARTITEM, REMOVECARTITEM, RESET, DELETECARTITEM } from './cart.reducer';
import { CartAction } from './cart.action'

@Injectable()
export class CartService {

    constructor(private store: Store<AppState>) {
    }

    getCart(): Cart {

        let myData: Cart;
        let myData$: Observable<Cart>;

        this.store.select<Cart>(x => x.TheCart).subscribe(data => myData = data)
        console.log(myData)
        return myData
    }

    

    reset() {
        this.store.dispatch({ type: RESET });
    }

    addToCart(myCartItem: CartItem): void {

        this.store.dispatch<CartAction>({ type: ADDCARTITEM, cartItem: myCartItem });
    }

    removeFromCart(myCartItem: CartItem): void {

        this.store.dispatch<CartAction>({ type: REMOVECARTITEM, cartItem: myCartItem });
    }

    deleteItem(myCartItem: CartItem) {
          this.store.dispatch<CartAction>({ type: DELETECARTITEM, cartItem: myCartItem });
    }
}