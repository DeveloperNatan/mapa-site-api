const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/", require("./routes/routes"));

app.listen(9001);
console.log("http://localhost:9001/api/relacao/");
