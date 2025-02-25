import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MessengerProvider } from "./hooks/useMessenger.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MessengerProvider>
      <App />
    </MessengerProvider>
  </StrictMode>
);
