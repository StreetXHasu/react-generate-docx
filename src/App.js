import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import UserPage from "./pages/user";
import UserReg from "./pages/userReg";
import UserLogin from "./pages/userLogin";
import UserLogout from "./pages/userLogout";
import GroupList from "./pages/groupList";
import GroupNew from "./pages/groupNew";
import GroupOne from "./pages/groupOne";
import DocsList from "./pages/docsList";
import DocsNew from "./pages/docsNew";
import DocsOne from "./pages/docsOne";
import Navbar from "./components/Navbar";

import "bulma/css/bulma.css";
import "material-design-icons/iconfont/material-icons.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <section className="section">
          <div className="container">
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
              <Route path="/docs/new">
                <DocsNew />
              </Route>
              <Route path="/docs/:id">
                <DocsOne />
              </Route>
              <Route path="/docs">
                <DocsList />
              </Route>
              <Route path="/login">
                <UserLogin />
              </Route>
              <Route path="/logout">
                <UserLogout />
              </Route>

              <Route path="/reg">
                <UserReg />
              </Route>
              <Route path="/user">
                <UserPage />
              </Route>
            </Switch>
          </div>
        </section>
      </Router>
    </div>
  );
}

export default App;
