import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./pages/home";
import GroupList from "./pages/groupList";
import GroupNew from "./pages/groupNew";
import GroupOne from "./pages/groupOne";
import Docs from "./pages/docs";

import "material-design-icons/iconfont/material-icons.css";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Главная</Link>
                </li>
                <li>
                  <Link to="/group">Группы документов</Link>
                </li>
                <li>
                  <Link to="/docs">Документы</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/group/new">
                <GroupNew />
              </Route>
              <Route path="/group/:id">
                <GroupOne />
              </Route>
              <Route path="/group">
                <GroupList />
              </Route>
              <Route path="/docs">
                <Docs />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
