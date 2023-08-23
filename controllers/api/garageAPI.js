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
                      // console.log("success");
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
      async (err, results) => {  
        if (err) {  
          console.log(err);
          return res.json({ success: false, message: "Database error" });
        }

        if (results.length === 0) {
          return res.json({ success: false, message: "Garage does not exist" });
        }

        let realPassword = results[0].password;
        if (!(await bcrypt.compare(password.toString(), realPassword))) {
          return res.json({ success: false, message: "Incorrect Password" });
        }

        res.json({
          success: true,
          message: "Garage successfully logged in",
          data: {
            token: jwt.sign({ mobile_number }, "superaxel", {
              expiresIn: "10000000000",
            }),
            garage: results[0],
          },
        });
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
    if (req.body.garage === "false") {
      pool.query(
        "select * from subadmins where mobile_number = ?",
        [req.body.number],
        (req, results) => {
          if (results[0]) {
            res.json({ success: true, garage: false, data: results[0] });
          } else {
            res.json({ success: false, message: "no such garage found" });
          }
        }
      );
    } else {
      pool.query(
        "select * from garages where mobile_number = ?",
        [req.body.number],
        (req, results) => {
          if (results[0]) {
            res.json({ success: true, garage: true, data: results[0] });
          } else {
            res.json({ success: false, message: "no such garage found" });
          }
        }
      );
    }
  } catch (error) {
    console.log(err);
    res.json({ success: false });
  }
};

// module.exports.loginSubAdmin = (req, res) => {
//   try {
//     const { mobile_number, password } = req.body;
//     pool.query(
//       `select * from subadmins where mobile_number = ?`,
//       [mobile_number],
//       async (req, results) => {
//         if (results) {
//           let realPassword = results[0].password;
//           if (!(await bcrypt.compare(password, realPassword))) {
//             return res.json({ success: false, message: `Incorrect Password` });
//           }
//           res.json({
//             success: true,
//             message: "SubAdmin successfully logged in",
//             data: {
//               token: jwt.sign({ mobile_number }, "superaxel", {
//                 expiresIn: "10000000000",
//               }),
//               SubAdmin: results[0],
//             },
//           });
//         } else {
//           res.json({ success: false, message: "SubAdmin does not exist" });
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error detected" });
//   }
// };

module.exports.loginSubAdmin = (req, res) => {
  try {
    const { mobile_number, password } = req.body;
    pool.query(
      `select * from subadmins where mobile_number = ?`,
      [mobile_number],
      async (err, results) => {  
        if (err) {  
          console.log(err);
          return res.json({ success: false, message: "Database error" });
        }

        if (results.length === 0) {
          return res.json({ success: false, message: "SubAdmin does not exist" });
        }

        let realPassword = results[0].password;
        if (!(await bcrypt.compare(password.toString(), realPassword))) {
          return res.json({ success: false, message: "Incorrect Password" });
        }

        res.json({
          success: true,
          message: "SubAdmin successfully logged in",
          data: {
            token: jwt.sign({ mobile_number }, "superaxel", {
              expiresIn: "10000000000",
            }),
            SubAdmin: results[0],
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error detected" });
  }
};


module.exports.getCars = async (req, res) => {
  try {
    const company = req.body.company;
    pool.query(
      "select * from companies where company = ?",
      [company],
      (req, results) => {
        const id = results[0].id;
        // console.log(id);
        pool.query(
          "select * from cars where company_id = ?",
          [id],
          (req, results) => {
            // console.log(results);
            res.json({ success: true, data: results });
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

// module.exports.getPrice = (req, res) => {
//   try {
//     const car = req.body.car;
//     pool.query(
//       "select * from cars where car_name = ?",
//       [car],
//       (req, results) => {
//         pool.query(
//           "select * from inventory where car_id = ?",
//           [results[0].id],
//           (req, results) => {
//             res.json({ success: true, data: results });
//           }
//         );
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false });
//   }
// };

module.exports.getPrice = (req, res) => {
  try {
    const car = req.body.car;
    const gID = req.body.gID;
    // First, fetch the state of the garage using gID
    pool.query(
      "SELECT state FROM garages WHERE id = ?",
      [gID],
      (error, garageResults) => {
        if (error) {
          console.log(error);
          res.json({ success: false });
          return;
        }

        const garageState = garageResults[0].state;

        // Then, fetch the inventory prices based on car_id and garageState
        pool.query(
          "SELECT inventory.* FROM inventory " +
          "JOIN subadmins ON inventory.subadmin_id = subadmins.id " +
          "WHERE inventory.car_id = ? AND subadmins.state = ?",
          [car, garageState],
          (error, inventoryResults) => {
            if (error) {
              console.log(error);
              res.json({ success: false });
              return;
            }

            res.json({ success: true, data: inventoryResults });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

module.exports.getProductPrice = (req, res) => {
  try {
    const car = req.body.car;
    const gID = req.body.gID;
    const categoryID = req.body.category;

    // First, fetch the state of the garage using gID
    pool.query(
      "SELECT state FROM garages WHERE id = ?",
      [gID],
      (error, garageResults) => {
        if (error) {
          console.log(error);
          res.json({ success: false });
          return;
        }

        const garageState = garageResults[0].state;

        const query = "SELECT products.id AS product_id, products.category_name, products.company_name, products.car_name, products.price, products_inventory.inventory, subadmins.state FROM products JOIN categories ON products.category_name = categories.category_name JOIN products_inventory ON categories.id = products_inventory.category_id JOIN subadmins ON products_inventory.subadmin_id = subadmins.id WHERE products_inventory.car_id = ? AND subadmins.state =? AND products_inventory.category_id = ?"
        pool.query(
          query,
          [car, garageState,categoryID],
          (error, inventoryResults) => {
            if (error) {
              console.log(error);
              res.json({ success: false });
              return;
            }

            res.json({ success: true, data: inventoryResults });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

module.exports.getCitiesByStateId = (req, res) => {
  const stateId = req.params.stateId;
  // console.log("gA"+stateId);
  pool.query(
    "SELECT * FROM cities WHERE state_id = ?",
    [stateId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.json({ cities: results });
      }
    }
  );
};
