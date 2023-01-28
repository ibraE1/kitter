import express from "express";

var app = express();
const port = 5000;

app.use(express.json());

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
