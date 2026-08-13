import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import profile from "./assets/images/profile.png";
import App from "./App.tsx";

const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;

if (favicon) {
  favicon.href = profile;
}

const appleIcon = document.querySelector(
  'link[rel="apple-touch-icon"]'
) as HTMLLinkElement;

if (appleIcon) {
  appleIcon.href = profile;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);