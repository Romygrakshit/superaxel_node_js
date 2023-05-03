const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  port: "3308",
  password: "password",
  database: "superaxel",
});

// const postBannerImage = async (req, res) => {};

// Configure multer
const storageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = path.join(__dirname, "../public/img/enquires");
    callback(null, uploadPath);
    req.uploadPath = uploadPath; // save upload path in request object
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const fileName = uniqueSuffix + extension;
    callback(null, fileName);
  },
});

const upload = multer({ storage: storageEngine });

module.exports.listEnquires = async (req, res) => {
  // Fetch data from the "Clubs" table
  pool.query(
    "SELECT * FROM enquires LEFT JOIN delivery_boy ON enquires.delivery_boy = delivery_boy.id LEFT JOIN companies ON enquires.company_id = companies.id LEFT JOIN cars ON enquires.car_id = cars.id",
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