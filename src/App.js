import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import Account from "./pages/account";
import Calculator from "./pages/Calculator";
import { Treasury } from "./pages/treasury";
// import {Link} from 'react-router-dom'
// import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <Router>
        {/* <Sidebar/> */}
        <Navbar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/accounts" component={Account} />
          <Route path="/calculator" component={Calculator} />
          <Route path="/treasury" component ={Treasury} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
