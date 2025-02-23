const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const loanRoutes = require("./routes/loanRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/loan", loanRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});