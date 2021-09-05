const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

//body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

connectDB();

app.use(cors());

// app.get("/", (req, res) => {
//   res.send("HELLO");
// });

// Routes
app.use("/auth", require("./src/auth/api"));
app.use("/card", require("./src/cardList/api"));

// server static assets in production
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});
