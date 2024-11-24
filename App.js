import express from "express";
import "dotenv/config";
import session from "express-session";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import Kanbas from "./Kanbas/index.js";
import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000", // Local frontend during development
  "https://6742d2517369db00081d70bc--dapper-tiramisu-b9829b.netlify.app", // Netlify deployed frontend
];

const app = express();
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

app.use(express.json());

Hello(app);

Lab5(app);

Kanbas(app);

app.listen(process.env.PORT || 4000);
