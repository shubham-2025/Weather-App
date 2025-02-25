import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MessengerProvider } from "./hooks/useMessenger.tsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MessengerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MessengerProvider>
    </Provider>
  </StrictMode>
);
