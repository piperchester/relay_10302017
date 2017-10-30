import 'bootstrap-loader';
import '../scss/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  createBrowserRouter, makeRouteConfig, Route, Link
} from 'found';

import { Home } from './components/home';
// import { CarHome } from './components/CarHome';
class AppPage extends React.Component {

  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    return <div>
      <header>
        <h1>GraphQL + Relay ⚛️</h1>
      </header>
      {this.props.children}
      {/* <footer>
        <small>&copy; 2017, Piper</small>
      </footer> */}
    </div>;
  }
}

const BrowserRouter = createBrowserRouter({
  routeConfig: makeRouteConfig(
    <Route path="/" Component={AppPage}>
      <Route Component={Home} />
    </Route>
  ),
});

ReactDOM.render(
  <BrowserRouter />,
  document.querySelector('main'),
);