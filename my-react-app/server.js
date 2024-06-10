/* Import Packages */
/* --------------------------------------------------------------------------------- */
import express from "express"; /* Hosting the express server */
import pg from "pg"; /* PostgreSQL database */
import bodyParser from "body-parser"; /* Form Parsing */
import env from "dotenv"; /* Environment Variables */
import cors from "cors";


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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend / route!' });
  });

/* Routes */
/* --------------------------------------------------------------------------------- */
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend /api route!' });
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/* Routes */
/* --------------------------------------------------------------------------------- */