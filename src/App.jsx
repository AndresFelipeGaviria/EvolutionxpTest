import React from 'react';
import './App.css';
import ContainerLogin from './components/containerLogin';
import CreateUser from './components/createUser';

import { BrowserRouter, Switch, Route } from "react-router-dom";
import DashboardApp from './components/dashboard/main-dashboard';


function App() {
  return (
    // <div className="container p-4">
    //   <div className="row">
    <React.Fragment>
       <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={ContainerLogin}
            />
          <Route
              exact
              path="/auth/CreateUser"
              component={CreateUser}
            />
            <Route
              
              path="/dashboard"
              component={DashboardApp}
            />
          </Switch>
      </BrowserRouter>
    </React.Fragment>
     
    //   </div>
    // </div>
  );
}

export default App;
