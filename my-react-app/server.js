/* Import Packages */
/* --------------------------------------------------------------------------------- */
import express from "express"; /* Hosting the express server */
import pg from "pg"; /* PostgreSQL database */
import bodyParser from "body-parser"; /* Form Parsing */
import env from "dotenv"; /* Environment Variables */
import cors from "cors";

import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";


/* Configure dotenv file */
/* --------------------------------------------------------------------------------- */
env.config();

/* Declare App and Global Constants */
/* --------------------------------------------------------------------------------- */
const app = express();
const port = process.env.PORT || 5000;

/* Database Linkup */
/* --------------------------------------------------------------------------------- */
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  });
  db.connect();

  /* Middleware Mounting */
/* --------------------------------------------------------------------------------- */
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 *60 *60 *24,
  },
})
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend / route!' });
  });

/* Routes */
/* --------------------------------------------------------------------------------- */
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend /api route!' });
});

app.post('/api/login', (req, res) => {
  const userInput = req.body.input;
  
  console.log('User Input:', userInput);
  
  res.json({ message: 'Input logged successfully' });
});

app.get('/api/home-page-cards', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM home_page_cards');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  app.get('/api/group-classes', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM group_classes');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });  

/* Strategies */

/* Local Strategy */
/* --------------------------------------------------------------------------------- */
passport.use(
  "local",
    new Strategy(async function verify(username, password, cb) {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
          username,
        ]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              //Error with password check
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                //Passed password check
                return cb(null, user);
              } else {
                //Did not pass password check
                return cb(null, false);
              }
            }
          });
        } else {
          return cb("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    })
  );

  
/* Google Strategy */
/* --------------------------------------------------------------------------------- */

  
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });