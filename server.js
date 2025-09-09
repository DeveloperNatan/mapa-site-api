const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/", require("./routes/routes"));

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
