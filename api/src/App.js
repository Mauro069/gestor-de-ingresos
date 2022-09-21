const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const db = require("./database");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const PORT = 4000;

app.use("/api", require("./routes"));

app.listen(PORT, () => {
  console.log(`SERVER FUNCIONANDO EN EL PUERTO ${PORT}`);
  db();
});

module.export = app;
