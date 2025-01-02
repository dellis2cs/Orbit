import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ClientRouter from "./components/ClientRouter";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClientRouter />
  </StrictMode>
);
