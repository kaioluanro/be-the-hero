import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Newincident from './pages/Newincident';


export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Logon} />
        <Route path='/register' component={Register} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/profile/new' component={Newincident} />
      </Switch>
    </BrowserRouter>
  )
}