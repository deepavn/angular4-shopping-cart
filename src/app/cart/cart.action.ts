import { Action, ActionReducer } from '@ngrx/store';
import { CartItem } from './cart-item.model'

export class CartAction implements Action {
  type: string;
  cartItem: CartItem; 
} 
