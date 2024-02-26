import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from './components/app/App';
import store from './redux/store';

import './styles/index.scss';



//console.log(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <BrowserRouter > 
      <Provider store={store}> 
      <App />
     </Provider> 
      </BrowserRouter> 
  </React.StrictMode>
);





/* ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter >
     <Provider store={store}>
      <App />
    </Provider>
     </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
); */

