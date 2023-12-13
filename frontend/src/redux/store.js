import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // Import composeWithDevTools
import notificationsReducer from './reducers/notificationsReducer';
import cartsReducer from './reducers/cartsReducer';
import userOnlineReducer from './reducers/userOnline';

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  carts: cartsReducer,
  userOnline: userOnlineReducer
});

const store = createStore(rootReducer, composeWithDevTools()); // Sử dụng composeWithDevTools

export default store;