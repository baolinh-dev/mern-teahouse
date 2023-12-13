// src/reducers/notificationsReducer.js
import { ADD_NOTIFICATION, DELETE_NOTIFICATION, CLEAR_NOTIFICATION } from '../actionTypes/notificationActionTypes';

const initialState = [];

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return [...state, action.payload];
        case DELETE_NOTIFICATION:
            const notificationId = action.payload;
            return state.filter((notification) => notification.id !== notificationId);
        case CLEAR_NOTIFICATION:
            return []; 
        default:
            return state;
    }
};

export default notificationsReducer;
