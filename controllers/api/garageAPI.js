const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

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
    let uploadPath = "";
    uploadPath = path.join(__dirname, "../../public/img/garage/profile");
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

module.exports.register_garage = async (req, res, next) => {
  try {
    upload.fields([{ name: "profileImages", maxCount: 1 }])(req, res, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      const {
        garage_name,
        state,
        city,
        address,
        mobile_number,
        lat,
        lng,
        password,
      } = req.body;

      const profileUrl =
        "../../img/garage/profile/" + req.files["profileImages"][0].filename;

      pool.query(
        "INSERT INTO images SET ?",
        { url: profileUrl },
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            insertData(
              garage_name,
              state,
              city,
              address,
              profileUrl,
              mobile_number,
              lat,
              lng,
              password,
              res
            );
          }
        }
      );
    });
  } catch (err) {
    // handle error
    res.sendStatus(500);
    console.log("error paji");
  }
};

const insertData = async (
  garage_name,
  state,
  city,
  address,
  profileUrl,
  mobile_number,
  lat,
  lng,
  password,
  res
) => {
  pool.query(
    `SELECT * FROM images WHERE url = ?`,
    [profileUrl],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            const profile_image_id = results[0].id;

            pool.query(
              "INSERT INTO garages SET ?",
              {
                garage_name,
                state,
                city,
                address,
                profile_image_id,
                mobile_number,
                lat,
                lng,
                password: hash,
              },
              (err, results) => {
                if (err) {
                  console.error(err);
                  res.sendStatus(500);
                } else {
                  // Redirect back to the add garage page
                  pool.query(
                    "select * from garages where mobile_number = ?",
                    [mobile_number],
                    (req, results) => {
                      console.log("success");
                      res.status(404).json({
                        success: true,
                        data: {
                          token: jwt.sign({ mobile_number }, "superaxel", {
                            expiresIn: "10000000000",
                          }),
                          garage: results[0],
                        },
                      });
                    }
                  );
                }
              }
            );
          }
        });
      }
    }
  );
};

module.exports.login_garage = async (req, res) => {
  try {
    const { mobile_number, password } = req.body;
    pool.query(
      `select * from garages where mobile_number = ?`,
      [mobile_number],
      async (req, results) => {
        if (results) {
          let realPassword = results[0].password;
          if (!(await bcrypt.compare(password, realPassword))) {
            return res.json({ success: false, message: `Incorrect Password` });
          }
          res.json({
            success: true,
            message: "User successfully logged in",
            data: {
              token: jwt.sign({ mobile_number }, "superaxel", {
                expiresIn: "10000000000",
              }),
              garage: results[0],
            },
          });
        } else {
          res.json({ success: false, message: "User does not exist" });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error detected" });
  }
};

module.exports.getAllStates = async (req, res) => {
  try {
    pool.query("select * from states", (req, states) => {
      pool.query("select * from companies", (req, companies) => {
        pool.query("select * from cars", (req, cars) => {
          res.json({
            success: true,
            data: { states: states, companies: companies, cars: cars },
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

module.exports.verify = async (req, res) => {
  try {
    pool.query(
      "select * from garages where mobile_number = ?",
      [req.body.number],
      (req, results) => {
        if (results[0]) {
          res.json({ success: true, data: results[0] });
        } else {
          res.json({ success: false, message: "no such garage found" });
        }
      }
    );
  } catch (error) {
    console.log(err);
    res.json({ success: false });
  }
};
