const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const { userRoute } = require("./routes/user");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
  } catch (error) {
    console.error("Database connection failed ❌", error);
    process.exit(1);
  }
}
main();
