import React from "react";
import Home from "./components/home";
import Converter from "./components/converter";
import StravaExport from "./components/stravaExport";
import NikeExport from "./components/nikeExport";
import Manual from "./components/manual";
import { Route, Switch } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <main className="container">
      <Switch>
        <Route path="/converter" component={Converter} />
        <Route path="/strava" component={StravaExport} />
        <Route path="/nike" component={NikeExport} />
        <Route path="/manual" component={Manual} />
        <Route path="/" component={Home} />
      </Switch>
    </main>
  );
}

export default App;
