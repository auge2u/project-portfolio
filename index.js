// This file serves as the main entry point for the application
// when running 'npm start'

// For Node.js environments, redirect to the webpack dev server
if (process.env.NODE_ENV !== "production") {
  console.log("Starting development server...");
  require("./node_modules/.bin/webpack-dev-server");
} else {
  // For production, serve the static files
  const express = require("express");
  const path = require("path");
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Serve static files from the dist directory
  app.use(express.static(path.join(__dirname, "dist")));

  // Send the index.html for any route
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
