import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./pages/home";
import GroupList from "./pages/groupList";
import GroupNew from "./pages/groupNew";
import GroupOne from "./pages/groupOne";
import Docs from "./pages/docs";
import Navbar from "./components/Navbar";

import "bulma/css/bulma.css";
import "material-design-icons/iconfont/material-icons.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <body className="">
          <section class="section">
            <div class="container">
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
          </section>
        </body>
      </Router>
    </div>
  );
}

export default App;
