require("./dbConnect");
require("dotenv").config();
require("multer");
const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const clientProfileRoutes = require("./routes/clientProfileRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const challengeRoutes = require("./routes/challengeRoutes");

// middlewares
app.use(express.json());
app.use(cors());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

app.post('/', (req, res) => {
    res.send('POST request to the homepage');
});

// routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/exercise", exerciseRoutes);
app.use("/client-profile", clientProfileRoutes);
app.use("/", sessionRoutes);
app.use("/", challengeRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}.`);
});