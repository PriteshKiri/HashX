import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from "../node_modules/@apollo/client";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

const httpLink = new HttpLink({ uri: "https://gql.hashnode.com" });

const authLink = new ApolloLink((operation, forward) => {
  // Use the setContext method to set the HTTP headers.

  window.chrome.storage.local.get(["username"]).then(({ username }: any) => {
    if (username) {
      operation.setContext({
        headers: {
          Authorization: username, // Replace with your actual token
        },
      });
    }
  }); // Correctly closing the then method

  // Call the next link in the middleware chain.
  return forward(operation);
});

// Use ApolloLink.from to combine the authLink and httpLink
const link = ApolloLink.from([authLink, httpLink]);

// Initialize Apollo Client with the link and a new instance of InMemoryCache
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
  background: #050816;
  color: white;
  all: unset;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }
`;
document.body.appendChild(rootElement);
document.body.appendChild(globalStyles);
// const client = new ApolloClient({
//   uri: "https://gql.hashnode.com",
//   cache: new InMemoryCache(),
// });

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
