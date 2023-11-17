// actions/notificationActions.js
import { ADD_NOTIFICATION,  DELETE_NOTIFICATION} from "~/actionTypes/notificationActionTypes";

// Action creators
export const addNotification = (notification) => {
    return {
        type: ADD_NOTIFICATION,
        payload: notification,
    };
};

export const deleteNotification = (notificationId) => {
    return {
        type: DELETE_NOTIFICATION,
        payload: notificationId,
    };
};
