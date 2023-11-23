import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // Import composeWithDevTools
import notificationsReducer from './reducers/notificationsReducer';
import usersReducer from './reducers/usersReducer'; 
import cartsReducer from './reducers/cartsReducer';

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  users: usersReducer, 
  carts: cartsReducer
});

const store = createStore(rootReducer, composeWithDevTools()); // Sử dụng composeWithDevTools

export default store;