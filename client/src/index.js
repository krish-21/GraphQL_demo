import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Import dependecies from Apollo Client
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

// http link to connect GraphQL client with GraphQL API
const httpLink = createHttpLink({ uri: "http://localhost:4000" });

// instantiate client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById("root")
);
