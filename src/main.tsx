import "./index.css";

import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import App from "./App.tsx";


function getApolloClient() {
  const uri = import.meta.env.VITE_API_URI as string | undefined;

  if (!uri) {
    throw new Error("VITE_API_URI not found.");
  }

  return new ApolloClient({
    uri: uri,
    cache: new InMemoryCache(),
  });
}

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={getApolloClient()}>
    <App />
  </ApolloProvider>
);
