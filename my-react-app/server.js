/* Import Packages */
/* --------------------------------------------------------------------------------- */
import express from "express"; /* Hosting the express server */
import pg from "pg"; /* PostgreSQL database */
import bodyParser from "body-parser"; /* Form Parsing */
/* import cors from "cors"; */
import argon2 from "argon2"
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import env from "dotenv"; /* Environment Variables */


/* Configure dotenv file */
/* --------------------------------------------------------------------------------- */


/* Declare App and Global Constants */
/* --------------------------------------------------------------------------------- */
const app = express();
const port = process.env.PORT || 5000;
env.config();



  /* Middleware Mounting */
/* --------------------------------------------------------------------------------- */
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); //this is necessary for interfacing between the client and server requests
/* app.use(cors()); */
app.use(session({
  secret: "TOPSECRETWORD",
  resave: false,
  saveUninitialized: true,
/*   cookie: {
    secure: true, // Ensure cookies are only sent over HTTPS
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    maxAge: 1000 *60 *60 *24,
  }, */
})
);
/* Passport usage must go after session */
app.use(passport.initialize());
app.use(passport.session());

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

/* Utlities */
/* --------------------------------------------------------------------------------- */
function getCurrentDate() {
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1).toString().padStart(2, '0')+'-'+today.getDate().toString().padStart(2, '0');
  return date;
  } 

  async function hashPassword(password) {
    try {
        // Configuration parameters for Argon2
        const options = {
            type: argon2.argon2id,          // Use Argon2id variant (recommended)
            memoryCost: 2 ** 16,             // Memory cost (64MB)
            timeCost: 4,                     // Time cost (number of iterations)
            parallelism: 2                   // Parallelism (number of threads)
        };

        const hash = await argon2.hash(password, options);
        return hash;
    } catch (err) {
        console.error('Error hashing password:', err);
    }
}

async function verifyPassword(hash, password) {
    try {
        const match = await argon2.verify(hash, password);
        if (match) {
            console.log('Password match');
        } else {
            console.log('Password does not match');
        }
    } catch (err) {
        console.error('Error verifying password:', err);
    }
}
/* Routes */
/* --------------------------------------------------------------------------------- */

app.get('/api/session', (req, res) => {
  console.log(req.user);
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.send("hi");
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
  
  app.get('/api/user-data', async (req, res) => {
    try {
      console.log(req.session);
      const result = await db.query('SELECT * FROM users WHERE email=$1', [
        req.user
      ]);
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
  new Strategy({
      usernameField: 'loginInfo[email]',
      passwordField: 'loginInfo[password]'
    },
    async (username, password, cb) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        if(await argon2.verify(storedHashedPassword, password)){
          return cb(null, user);
        } else {
          return cb(null, false, { message: 'Incorrect password.' });
        }
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      const user = result.rows[0];
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });