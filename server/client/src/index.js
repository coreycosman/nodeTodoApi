import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import jwtDecode from 'jwt-decode'

import setAuthToken from './utils/set-auth-token'
import App from './components/App';
import rootReducer from './reducers';
import { setCurrentUser, logout } from './actions/auth-action'

const middleware = [reduxThunk]
const composeEnhancers = composeWithDevTools({});
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)));


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwtDecode(localStorage.jwtToken)
  decoded.token = localStorage.jwtToken
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Math.floor(Date.now() / 1000)
  if (decoded.exp < currentTime) {
    store.dispatch(logout())
    window.location.href = '/'
  }
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
