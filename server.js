const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ Connected to MongoDB Atlas");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Hello! MongoDB Connected.");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});