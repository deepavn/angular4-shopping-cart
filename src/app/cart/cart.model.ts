import { CartItem} from './cart-item.model'

export interface Cart  {
    cartItems: CartItem[];
    totalItems: number;
    totalPrice: number; 
}