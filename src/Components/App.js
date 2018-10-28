import React, { Component } from 'react';
import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import InfoBar from './InfoBar/InfoBar';
import Support from './Support/Support';
import Problems from './Problems/Problems';
import HelpOnWay from './HelpOnWay/HelpOnWay';
import Issues from './Issues/Issues';
import Rep from './Rep/Rep';
import Repissue from './Repissue/Repissue';
import SelfFix from './SelfFix/SelfFix';
import './App.css';


class App extends Component {
  render() {
    return (
        <BrowserRouter>
              <div className="App">
                  <NavBar/>
                  <InfoBar/>
                  <Switch>
                      <Route path="/user" exact component={Support} />
                      <Route path="/user/check-problems/:userId" component={Problems}/>
                      <Route path="/user/check-problem/done" component={HelpOnWay}/>
                      <Route path="/user/self-fix/:pId" component={SelfFix}/>
                      <Route path="/admin/issues" component={Issues}/>
                      <Route path="/rep/issues" component={Rep}/>
                      <Route path="/rep/issue" component={Repissue}/>
                      <Redirect from="/" to="/user"/>
                  </Switch>
              </div>
        </BrowserRouter>
    );
  }
}

export default App;
