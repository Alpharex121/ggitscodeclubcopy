require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { mainRating } = require("./models/db2.model.js");
const cors = require("cors");
const port = process.env.PORT || 3000;
const auth = require("./middleware/auth.js");
require("./db/Connection.js");

const allowedOrigins = [
  "https://ggitscodeclubcopy-up9q.vercel.app",
  "https://ggits-coding-club.vercel.app",
  "https://www.dpcoding.club",
];

const corsOptionss = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, HEAD",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  next();
});

app.use(cors(corsOptionss));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Importing routes
const rolesRouter = require("./routes/roles.js");
const resourcesRouter = require("./routes/resources.js");
const jobRouter = require("./routes/jobs.js");
const newsRouter = require("./routes/news.js");
const loginRouter = require("./routes/login.js");
const leaderboardRouter = require("./routes/leaderboard.js");

// Configuring routes
app.use("/admin", rolesRouter);
app.use("/resources", resourcesRouter);
app.use("/jobs", jobRouter);
app.use("/news", newsRouter);
app.use("/login", loginRouter);
app.use("/leaderboard", leaderboardRouter);

app.listen(port, (req, res) => {
  console.log(`Server is running at port ${port}`);
});
