import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store-v1.jsx"; // Import the store to initialize it

store.dispatch({
  type: "account/deposit",
  payload: 500,
});
console.log("Initial state:", store.getState());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
