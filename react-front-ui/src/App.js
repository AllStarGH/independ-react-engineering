import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import logo from './logo.svg';
// import './App.css';

import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import store from '@/store';
import MyRouter from '@/router';

/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://gitee.com/yuanjingpeng/react-engineering"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn The React
            </a>
</header>*/

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