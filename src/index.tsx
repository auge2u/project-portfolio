import React from "react";
import { createRoot } from "react-dom/client";
import EnhancedPortfolioPage from "./components/EnhancedPortfolioPage";

// Apply any global styles if needed
import "./styles.css";

// Get the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found in the document");
}

// Create a React root
const root = createRoot(rootElement);

// Render the application
root.render(
  <React.StrictMode>
    <EnhancedPortfolioPage />
  </React.StrictMode>
);
