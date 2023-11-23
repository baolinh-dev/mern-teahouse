// src/reducers/cartActionTypes.js
import { ADD_CART, UPDATE_CART, DELETE_CART } from '../actionTypes/cartActionTypes';

const initialState = [];

const cartsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CART:
            return [...state, action.payload];
        case UPDATE_CART:
            const newCart = action.payload;
            return newCart;
        case DELETE_CART:
            const cartId = action.payload;
            return state.filter((cart) => cart.id !== cartId);

        default:
            return state;
    }
};

export default cartsReducer;
