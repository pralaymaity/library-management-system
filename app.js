require("dotenv").config();
const express = require("express");
const path = require("path");

const connectDB = require("./src/config/db.config");
const booksRoute = require("./src/routes/booksRoute");
const memberRoute = require("./src/routes/memberRoute");
const borrowRecordRoute = require("./src/routes/borrowRecordsRoute");
const returnBookRoute = require("./src/routes/returnBookRoute");

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
app.use("/api", borrowRecordRoute);
app.use("/api", returnBookRoute);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port no ${process.env.PORT}`);
});
