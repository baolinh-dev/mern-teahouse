// src/reducers/cartActionTypes.js
import { SET_USER_ONLINE } from '../actionTypes/userOnlineTypes';

const initialState = {
    userName: 'TEAHOUSE',
    userAvatarUrl: 'https://firebasestorage.googleapis.com/v0/b/mern-teahouse.appspot.com/o/profile-images%2F64d31b22-47b1-4189-b39e-c0c9dcc583fa?alt=media&token=6f38403e-2298-4542-8c76-8622eee35605',
    userId: '66cad3c54f35c19a47827572',
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
