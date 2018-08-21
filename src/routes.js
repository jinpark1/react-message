import React from 'react';
//import Route and Switch from react-router-dom
import { Route, Switch } from 'react-router-dom';
///import components for your routes 
import Home from './components/container/Home/Home';
import WorkspacePage from './components/container/WorkspacePage/WorkspacePage';
import RegisterPage from './components/container/RegisterPage/RegisterPage';

export default <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/register' component={RegisterPage} />
                    <Route path='/workspaces/:id' component={WorkspacePage} />
                </Switch>