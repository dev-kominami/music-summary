import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import App from '../App';

import Top from './Top';

export const Path = {
  app: '/',
  top: '/top',
};

const routes = (
  <Switch>
    <Route exact path={Path.app} component={App} />
    <Route exact path={Path.top} component={Top} />
    <Redirect to={Path.app} />
  </Switch>
);

export default routes;
