import { ADD_TO_CART } from './constants'

 export function AddToCart(item) {
    return (
        {
            type: ADD_TO_CART,
            data: item
        }
    );
 }
