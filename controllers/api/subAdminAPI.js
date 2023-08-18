const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "superaxel",
});

module.exports.createInventory = (req, res) => {
  const {
    car_name,
    subAdmin_id,
    left_axel_price,
    left_axel_inventory,
    right_axel_price,
    right_axel_inventory,
  } = req.body;
  // console.log(req.body);

  try {
    pool.query(
      "select * from cars where car_name = ?",
      [car_name],
      (req, results) => {
        // console.log(results);
        pool.query(
          `insert into inventory(car_id,left_axel_price,left_axel_inventory,right_axel_price,right_axel_inventory,subadmin_id) values (${results[0].id},${left_axel_price},${left_axel_inventory},${right_axel_price},${right_axel_inventory},${subAdmin_id})`,
          (req) => {
            res.json({ success: true });
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

module.exports.getEnquiryByState = (req, res) => {
  try {
    pool.query(
      "select * from enquires where state = ?",
      [req.body.state],
      (req, results) => {
        res.json({ success: true, data: results });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "some issue occrured" });
  }
};

module.exports.getProductEnquiryByState = (req, res) => {
  const subadmin_id = req.body.sID;

  pool.query(
    "SELECT * FROM subadmins WHERE id = ?",
    [subadmin_id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.json({ success: false });
      } else {
        const state = results[0].state;
        pool.query(
          "select * from products_enquires where state = ?",
          [state],
          (req, results) => {
            res.json({ success: true, data: results });
          }
        );
      }
    }
  );
};

module.exports.updateEnq = (req, res) => {
  try {
    pool.query(
      "update enquires set offered_price = ?, status = ? where id = ?",
      [req.body.price, req.body.status, req.body.id],
      (req, results) => {
        res.status(200).json({ message: "Enquiry updated successfully" });
      }
    );
  } catch (err) {
    console.log("error", err);
    res.status(404).json({ message: "some issues occured" });
  }
};
