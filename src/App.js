import React from 'react';
import './App.css';
import ContainerLogin from './components/containerLogin';
import CreateUser from './components/createUser';
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
              path="/create/user"
              component={CreateUser}
            />
          </Switch>
      </BrowserRouter>
    </React.Fragment>
     
    //   </div>
    // </div>
  );
}

export default App;
