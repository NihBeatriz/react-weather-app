import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Explore from './pages/Explore';

export default function Routes() {
    return (
        <BrowserRouter>
        <Switch>
           <Route path="/" exact component={Login} />
           <Route path="/signup" component={SignUp} />     
           <Route path="/explore" component={Explore} />       
        </Switch>
        </BrowserRouter>
    );
}