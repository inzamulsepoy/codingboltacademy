const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Route handler without .html
app.get("/:page", (req, res, next) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, "public", `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) next();
  });
});

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Redirect from .html → clean URL
app.get("/:page.html", (req, res) => {
  res.redirect("/" + req.params.page);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
