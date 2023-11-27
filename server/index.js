const path = require("path");
const express = require("express");
const appRouter = require("./routes/index");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;
const clientDir = path.resolve(process.cwd(), "build");

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", appRouter);
app.use(express.static(clientDir));
app.use("/**", (req, res) => {
  res.sendFile(path.resolve(clientDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
