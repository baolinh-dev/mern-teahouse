// actions/notificationActions.js
import { ADD_CART, CLEAR_CART, DELETE_CART, UPDATE_CART, } from "~/actionTypes/cartActionTypes";

// Action creators
export const addCart = (cart) => {
    return {
        type: ADD_CART,
        payload: cart,
    };
}; 

export const updateCart = (cart) => {
    return {
        type: UPDATE_CART, 
        payload: cart,
    };
};
export const deleteCart = (cartId) => {
    return {
        type: DELETE_CART, 
        payload: cartId,
    };
}; 
export const clearCart = () => {
    return {
        type: CLEAR_CART,
    };
};




