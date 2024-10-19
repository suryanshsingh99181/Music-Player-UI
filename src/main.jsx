import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TrackProvider } from "./context/TrackContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TrackProvider>
      <App />
    </TrackProvider>
  </StrictMode>
);
