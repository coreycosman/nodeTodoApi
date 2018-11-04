import React from 'react';
import { createStore, applyMiddleware, compose} from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import rootReducer from './reducers';

const middleware = [reduxThunk]
const composeEnhancers = composeWithDevTools({});
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)));

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.querySelector('#root')
);
