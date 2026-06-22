require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const paperRoutes = require("./routes/paperRoutes"); 
const app = express();


connectDB();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "ResearchAtlas API Running",
  });
});


app.use("/api/auth", authRoutes);
app.use("/api/papers", paperRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});