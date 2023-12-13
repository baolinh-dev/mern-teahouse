import { SET_USER_ONLINE } from '~/redux/actionTypes/userOnlineTypes';

export const setUserOnline = (userName, userAvatarUrl, userId) => {
    return {
        type: SET_USER_ONLINE,
        payload: {
            userName,
            userAvatarUrl,
            userId,
        },
    };
};
