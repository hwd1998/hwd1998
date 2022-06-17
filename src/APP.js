import React from "react";
import "antd/dist/antd.min.css";
import Layout from "@/layouts/layout";
import Login from "@/views/login/login";
import NotFound from "@/views/NotFound";
import { HashRouter, Route, Switch } from "react-router-dom";

export default function APP() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login} exact></Route>
        <Route path='/404' component={NotFound} exact></Route>
        <Layout />
      </Switch>
    </HashRouter>
  );
}
