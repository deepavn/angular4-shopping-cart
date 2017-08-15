
import { Action, ActionReducer } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';

import { LoadState, SaveState } from '../shared/local-storage'
import { AppState } from '../core/app-state'

import { CartAction } from './cart.action'

import { CartItem } from './cart-item.model'
import { Cart } from './cart.model';
import { CartCount } from './cart-count.model'

export const ADDCARTITEM = '[cart] ADDCARTITEM';
export const REMOVECARTITEM = '[cart] REMOVECARTITEM';
export const DELETECARTITEM = '[cart] DELETECARTITEM';
export const RESET = '[cart] RESET';

let localStorageCart: Cart
localStorageCart = LoadState()

export const initialCartState: Cart =
    (localStorageCart.cartItems != undefined && localStorageCart.totalItems != undefined) // condition: Verify the local-storage values of the cart
        ?  // If localstorage value is satisfied by the specified condition
        {
            cartItems: localStorageCart.cartItems,
            totalItems: localStorageCart.totalItems,
            totalPrice: localStorageCart.totalPrice
        }

        :  // else If localstorage value is NOT satisfied by the specified condition, then default values
        {
            cartItems: [],
            totalItems: 0,
            totalPrice: 0
        }

export function CartReducer(myCart: Cart = initialCartState, myCartItem: CartAction) {

    //export const CartReducer: ActionReducer<Cart> = (myCart: Cart = initialCartState, myCartItem: CartAction) => {
    switch (myCartItem.type) {

        case ADDCARTITEM:
            let thisACart: Cart // create a new cart to perform the changes in the items

            thisACart = pushToCart(myCart, myCartItem.cartItem)

            SaveState(thisACart) // save the new cart to local-storage
            return thisACart

        case REMOVECARTITEM:

            let thisRCart: Cart
            thisRCart = pullFromCart(myCart, myCartItem.cartItem)
            SaveState(thisRCart)
            return thisRCart

        case DELETECARTITEM:

            let thisDCart: Cart
            thisDCart = deleteItem(myCart, myCartItem.cartItem)
            SaveState(thisDCart)
            return thisDCart

        case RESET:
            let thisResetCart: Cart
            thisResetCart = ({ cartItems: [], totalItems: 0, totalPrice: 0 })
            SaveState(thisResetCart)
            return thisResetCart;

        default:
            return myCart;
    }
}


function pushToCart(shopCart: Cart, payload: CartItem) {
    updateItems(shopCart, payload, "add");
    return shopCart;
}

function pullFromCart(shopCart: Cart, payload: CartItem) {
    updateItems(shopCart, payload, "remove");
    return shopCart;
}

function getTargetItem(shopCart: Cart, payloadId: number): CartItem {
    return shopCart.cartItems.find(item => item.id === payloadId);
}

function deleteItem(shopCart: Cart, payload: CartItem) {
    let targetItem = getTargetItem(shopCart, payload.id)
    if (targetItem) { //Exist
        targetItem.quantity = 0;
        targetItem.price = 0;

        var index = shopCart.cartItems.indexOf(targetItem);
        shopCart.cartItems.splice(index, 1);
        return shopCart;
    }
}

function updateItems(shopCart: Cart, payload: CartItem, actionType: string) {

    // UPDATE THE INDIVIDUAL CART ITEM

    let targetItem = getTargetItem(shopCart, payload.id)
    if (targetItem) { //Exist

        if (actionType == "add") {
            targetItem.quantity += payload.quantity;
            targetItem.price += payload.price;
        }
        else {
            targetItem.quantity -= payload.quantity;
            targetItem.price -= payload.price;
        }
        // Delete cart item if the quantity is 0
        if (targetItem.quantity == 0) {
            shopCart = deleteItem(shopCart, payload)
        }

    }
    else {
        shopCart.cartItems.push(payload);
    }

    // UPDATE THE ENTIRE SHOPPING CART FOR THE TOTAL PRICE AND QUANTITY

    let cartPrice: number = 0
    let cartQuantity: number = 0

    shopCart.cartItems.forEach(element => {
        cartPrice += element.price
        cartQuantity += element.quantity
    });

    shopCart.totalItems = cartQuantity
    shopCart.totalPrice = cartPrice
}