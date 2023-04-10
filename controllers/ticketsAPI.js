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
const createTickets = async (req, res) => {
  const { ticket_type, price, cover, event_id } = req.body;

  pool.query(
    "INSERT INTO tickets SET ?",
    {
      ticket_type,
      price,
      cover,
      event_id,
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

const editTickets = async (req, res) => {
  const { ticket_type, price, cover } = req.body;
  const id = req.params.id;

  // Update category to database
  pool.query(
    "UPDATE tickets SET ticket_type = ?, price = ?, cover =?  WHERE id = ?",
    [ticket_type, price, cover, id],
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
const deleteTickets = async (req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM tickets WHERE id = ${id}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};
// category List
const listTickets = async (req, res) => {
  pool.query("SELECT * FROM tickets", (err, results) => {
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
  createTickets,
  editTickets,
  deleteTickets,
  listTickets,
};
