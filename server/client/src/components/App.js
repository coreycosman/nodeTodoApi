import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './header';
import Dashboard from './dashboard';
import Landing from './landing';
import  '../sass/css-loader.scss';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" component={ Landing } exact />
          <Route path="/dashboard" component={Dashboard} exact />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
