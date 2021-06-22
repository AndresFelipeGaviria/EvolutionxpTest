import React from 'react';
import './App.css';
import ContainerLogin from './components/containerLogin';
import CreateUser from './components/createUser';
import Home from './components/home';
import Radicados from './components/radicado';
import Pqrs from './components/pqr';
import CreatePqr from './components/pqr/createPqr';
import RadicadoDetalle from './components/pqr/radicadoDetalle';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";


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
              exact
              path="/dashboard/home"
              component={Home}
            />
            <Route
              exact
              path="/dashboard/radicados"
              component={Radicados}
            />
            <Route
              exact
              path="/dashboard/pqrs"
              component={Pqrs}
            />
            <Route
              exact
              path="/dashboard/createPqr"
              component={CreatePqr}
            />
             <Route
              exact
              path="/dashboard/RadicadoDetalle"
              component={RadicadoDetalle}
            />
          </Switch>
      </BrowserRouter>
    </React.Fragment>
     
    //   </div>
    // </div>
  );
}

export default App;
