import React from 'react';
import { render } from '@testing-library/react';
import { Router, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import {  legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../Redux/Reducers/rootReducer'

export const renderWithRouterAndRedux = (component, initialState, route = '/') => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndRedux;
