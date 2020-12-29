import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import logo from './logo.svg';
// import './App.css';

import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import store from '@/store';
import MyRouter from '@/router';

function App() {
    return (
        <div className="App">
          <Provider store={store}>
            <AppContainer>
              <Router>
                <MyRouter />
              </Router>
            </AppContainer>
          </Provider>
        </div>
    );
}

export default App;