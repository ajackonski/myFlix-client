import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { Provider } from 'react-redux'; // If using Redux
import { App } from './app'; // Import your App component
import store from './redux/store'; // If using Redux
import './index.scss';

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(
  <Provider store={store}> {/* If you're using Redux */}
    <BrowserRouter> {/* Wrap the entire app with BrowserRouter */}
      <App />
    </BrowserRouter>
  </Provider>
);
