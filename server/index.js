require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db/db");
app.set("view engine", "ejs");
const contactRouter = require("./routes/contactRouter");

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/contacts", contactRouter);

app.listen(process.env.SERVER_PORT || 8080, () => {
  console.log("Loaded port:", process.env.SERVER_PORT);
});
