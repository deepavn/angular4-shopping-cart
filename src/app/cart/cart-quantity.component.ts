
import { Component, OnInit, Input, Output, Pipe, PipeTransform } from '@angular/core'

import { ADDCARTITEM, REMOVECARTITEM, RESET } from './cart.reducer'

import { CartItem } from './cart-item.model';
import { CartService } from '../cart/cart.service';

@Component({
    selector: 'cartItem-quantity',
    templateUrl: './cart-quantity.html'            
})



export class CartQuantityComponent implements OnInit {
    @Input() childShopItem: CartItem
    @Input() itemPricey: number
    shopItem: CartItem


    constructor(private cartService: CartService) {
        console.log(this.childShopItem)
    }

     increment() {

        let totalQuantity: number
        let unitPrice: number
        totalQuantity = this.shopItem.quantity
        if (totalQuantity>0)
        unitPrice = this.shopItem.price / totalQuantity
        else
            unitPrice = this.shopItem.price

        let myCartItem: CartItem
        myCartItem = new CartItem()
        myCartItem.id = this.shopItem.id
        myCartItem.name = this.shopItem.name
        myCartItem.price = unitPrice
        myCartItem.quantity = 1

        this.cartService.addToCart(myCartItem)
        this.resetItems()
    }

     decrement() {
        let totalQuantity: number
        let unitPrice: number
        totalQuantity = this.shopItem.quantity
        unitPrice = this.shopItem.price / totalQuantity

        let myCartItem: CartItem
        myCartItem = new CartItem()
        myCartItem.id = this.shopItem.id
        myCartItem.name = this.shopItem.name
        myCartItem.price = unitPrice//this.shopItem.price
        myCartItem.quantity = 1

        this.cartService.removeFromCart(myCartItem)
        this.resetItems()
    }

    ngOnInit() {

        this.resetItems()
    }

    resetItems() {
        this.shopItem = {
            id: this.childShopItem.id
            , name: this.childShopItem.name
            , price: this.childShopItem.price
            , quantity: this.childShopItem.quantity
        };
    }
}