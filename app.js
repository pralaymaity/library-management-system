require("dotenv").config();
const express = require("express");

const connectDB = require("./src/config/db.config");
const booksRoute = require("./src/routes/booksRoute");
const memberRoute = require("./src/routes/memberRoute");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

connectDB();

app.use("/api", booksRoute);
app.use("/api", memberRoute);

app.listen(process.env.PORT, (req, res) => {
  console.log(`server is running on port no ${process.env.PORT}`);
});
