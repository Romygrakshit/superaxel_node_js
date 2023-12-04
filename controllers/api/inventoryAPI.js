const mysql = require("mysql");


// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "superaxel",
});

module.exports.listInventorySubadmin = async (req, res) => {
  // Fetch data from the "Clubs" table
  let {Id} = req.body;

  if (Id == undefined) {
    Id = req.params.id;
  }
  if (Id == undefined) {
    Id = 1;
  }
  // Fetch data from the "subadmins" table
  pool.query(`SELECT * FROM subadmins WHERE id = ?`, [Id], (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const subadmin = results[0];
      // Render the manageInventoryPage.ejs with Inventory data
      pool.query(`SELECT * FROM subadmins WHERE id != ${Id}`, (err, results) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          const subadmins = results;
          pool.query("SELECT inventory.*, inventory.id as in_id, cars.*, companies.* FROM inventory JOIN cars ON inventory.car_id = cars.id LEFT JOIN companies ON cars.company_id = companies.id WHERE inventory.subadmin_id = ?", [Id], (err, results) => {
            if (err) {
              console.error(err);
              res.status(500).json({ success: false, error: err });
            } else {
              const inventory = results;
              res.status(400).json({ success: true, data: inventory });
            }
          });
        }
      });
    }
  });
};