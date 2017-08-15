import { CartItem } from '../cart/cart-item.model'
import { Cart } from '../cart/cart.model'
/*
When we use multiple reducers and stores Ngrx will behind the scenes combine them into one global state. 
We'll need this global state later when we are injecting our store object, 
The global state interface is basically an object whose 
properties' types are the interfaces for the various state interfaces we are using in our app. 

*/

export interface AppState {

    TheCart: Cart
    TheCartCount: number 
}

