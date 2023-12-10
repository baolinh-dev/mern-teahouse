// src/reducers/cartActionTypes.js
import { SET_USER_ONLINE } from '../actionTypes/userOnlineTypes';

const initialState = {
    userName: null,
    userAvatarUrl: null,
    userId: '657340cb1484b471f17bfba2',
};

const userOnline = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ONLINE:
            return {
                ...state,
                userName: action.payload.userName,
                userAvatarUrl: action.payload.userAvatarUrl,
                userId: action.payload.userId,
            };
        default:
            return state;
    }
};

export default userOnline;
