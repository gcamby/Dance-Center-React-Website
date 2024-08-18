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
import multer from "multer"
import path from "path"


/* Configure dotenv file */
/* --------------------------------------------------------------------------------- */


/* Declare App and Global Constants */
/* --------------------------------------------------------------------------------- */
const app = express();
const port = process.env.PORT || 5000;
env.config();

// Configure storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'profile-pictures/'); // Directory to store the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename the file with a timestamp
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Optional: filter files based on their MIME type
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'));
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // Optional: limit file size to 5MB
});

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
  cookie: {
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    maxAge: 1000 *60 *60 *24,
  },
})
);
/* Passport usage must go after session */
app.use(passport.initialize());
app.use(passport.session());



// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

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

app.post("/api/register", async (req, res) => {
  const fName = req.body.registerInfo.fName;
  const lName  = req.body.registerInfo.lName;
  const email = req.body.registerInfo.email;
  const password = req.body.registerInfo.password;
  const confirmPassword = req.body.registerInfo.confirmPassword;

  
  if (password === confirmPassword){
    try {
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
  
      if (checkResult.rows.length > 0) {
        req.redirect("/login");
      } else {
            const hash = await hashPassword(password);
            const result = await db.query(
              "INSERT INTO users (fname, lname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
              [fName, lName, email, hash]
            );
            const user = result.rows[0];
            req.login(user, (err) => {
              console.log("success");
              res.redirect("/secrets");
            });
          
        };
      
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("Password and Confirmed Password did not match")
  }

});

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ error: info.message });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.json({ user: user, nav: "/account" });
    });
  })(req, res, next);
});

app.post('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.clearCookie('connect.sid'); // Optionally clear the cookie
      res.json({ message: 'Logged out successfully', nav: "/" });
    });
  });
});



app.get('/api/current-user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// Single file upload route
app.post('/api/upload-single', upload.single('file'),async (req, res) => {
  try {
    
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      req.user.email,]);


      
      await db.query(
        "UPDATE users SET profile_picture = $1 WHERE email = $2",
        [("profile-pictures/"+req.file.filename),req.user.email]
      );
      
      console.log(true);
    

    res.status(200).json({ message: 'File uploaded successfully', file: req.file });

  } catch (err) {
    res.status(500).json({ error: err.message });
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
  
  app.get('/api/user-data', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM users WHERE email=$1', [
        req.user.email
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