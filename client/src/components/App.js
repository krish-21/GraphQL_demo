import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router";

import AuthContext from "../store/auth-context";

import Layout from "./Layout/Layout";
import LinkList from "./Links/LinkList";
import CreateLink from "./Links/CreateLink";
import Auth from "./Auth/Auth";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <LinkList />
        </Route>

        <Route exact path="/auth">
          {isLoggedIn ? <Redirect to="/" /> : <Auth />}
        </Route>

        <Route exact path="/create">
          {isLoggedIn ? <CreateLink /> : <Redirect to="/auth" />}
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
