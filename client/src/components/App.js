import { Switch, Route } from "react-router";

import Header from "./UI/Header";
import LinkList from "./Links/LinkList";
import CreateLink from "./Links/CreateLink";

function App() {
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
