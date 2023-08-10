const mysql = require("mysql");
// const multer = require("multer");
// const path = require("path");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const jwt = require("jsonwebtoken");

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "superaxel",
});

module.exports.listInventory = async (req, res) => {
  // Fetch data from the "Clubs" table
  pool.query(
    "SELECT pi.id, c.company, car.car_name, sa.name, pi.inventory, pi.date FROM products_inventory pi LEFT JOIN companies c ON pi.company_id = c.id LEFT JOIN cars car ON pi.car_id = car.id LEFT JOIN subadmins sa ON pi.subadmin_id = sa.id",
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err });
      } else {
        res.status(400).json({ success: true, data: results });
      }
    }
  );
};

module.exports.listProduct = async (req, res) => {
  const { companyName, carName } = req.params;
  // Fetch data from the "Clubs" table
  pool.query(
    "SELECT * FROM products WHERE company_name = ? AND car_name = ? ",[companyName,carName],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err });
      } else {
        res.status(400).json({ success: true, data: results });
      }
    }
  );
};
