

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
const port = Number(process.env.PORT) || 3000;



app.put(
  "/api/users/:id",
  validateUserId,
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  })
);

const startServer = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing. Set it in config/.env.");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`REST API listening at http://localhost:${port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start the REST API:", error.message);
  process.exitCode = 1;
});
