import React, { useMemo, useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./login.component";
import SignUp from "./signup.component";
import { AuthProvider } from '../contexts/authContext'; 
import Dashboard from './Dashboard/homepage';

const App = () => {
  const [user, setUser] = useState("")
  return (<BrowserRouter>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <AuthProvider>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
          </AuthProvider>
        </div>
      </div>
    </div></BrowserRouter>
  );
}

export default App;