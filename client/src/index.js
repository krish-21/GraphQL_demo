import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import "./index.css";

import { AuthContextProvider } from "./store/auth-context";
import client from "./utils/apolloClient";
import App from "./components/App";

ReactDOM.render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
  document.getElementById("root")
);
