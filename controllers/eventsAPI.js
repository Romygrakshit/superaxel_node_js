const mysql = require("mysql");
// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "partypal",
});
// create category in database
const createEvents = async (req, res) => {
  const { name, description, club_id, recurring, day } = req.body;

  pool.query(
    "INSERT INTO events SET ?",
    {
      name,
      description,
      club_id,
      recurring,
      day,
    },
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
};

const editEvents = async (req, res) => {
  const { name, description, club_id, recurring, day } = req.body;
  const id = req.params.id;

  // Update category to database
  pool.query(
    "UPDATE events SET name = ?, description = ?, club_id =?, recurring = ?, day =?  WHERE id = ?",
    [name, description, club_id, recurring, day, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
};

// Delete category
const deleteEvents = async (req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM events WHERE id = ${id}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};
// category List
const listEvents = async (req, res) => {
  pool.query("SELECT * FROM events", (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageusers.hbs template with the user data
      res.json(results);
    }
  });
};

module.exports = {
  createEvents,
  editEvents,
  deleteEvents,
  listEvents,
};
