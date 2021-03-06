import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';

import 'antd/dist/antd.css';
import './css/materialize.min.css';
import './css/main.css';
import App from './containers/Layout/App';
import reducer from './store/reducer';

const store = createStore(
  reducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // para usar devtools de redux en navegador.
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
    document.getElementById('root')
  )