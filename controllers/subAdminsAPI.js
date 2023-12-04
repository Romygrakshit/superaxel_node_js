const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { check, validationResult } = require("express-validator");
// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "superaxel",
});


const validateInputs = [
  check("name").notEmpty().withMessage("Name is required"),
  check("mobile_number")
    .isMobilePhone()
    .isLength({ min: 10 })
    .withMessage("Invalid mobile number"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
// Register SubAdmin
const registerSubAdmins = async (req, res) => {
  const { name, mobile_number, state_id, city, password } = req.body;

  // Define validation rules

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Hash password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Add garage to database
      pool.query(
        'SELECT * FROM states WHERE states.id = ?', [state_id],
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            const state = results[0].state;
            pool.query(
              "INSERT INTO subadmins SET ?",
              {
                name,
                mobile_number,
                state,
                city,
                password: hash,
              },
              (err, results) => {
                if (err) {
                  console.error(err);
                  res.sendStatus(500);
                } else {
                  // Redirect back to the manage garage list

                  res.redirect("/subadmins/list?added=1");
                }
              }
            );
          }
        }
      )

    }
  });
};
// Add SubAdmin Page
const addSubAdminsPage = async (req, res) => {
  pool.query(`SELECT * FROM states`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const states = results;

      // Render the editSubAdminPage.ejs with SubAdmin data
      res.render("addSubAdminPage", { states });
    }
  });

};

const updatePassword = async (req, res) => {
  const { id, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Add garage to database
      pool.query(
        "UPDATE subadmins SET password = ? WHERE id = ?",
        [hash, id],
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            // Redirect back to the manage garage list

            res.redirect("/subadmins/list");
          }
        }
      );
    }
  });
};

// Edit SubAdmin
const editSubAdmins = async (req, res) => {
  const { id, name, mobile_number, state_id, city, password } = req.body;
  // Update garage to database
  pool.query(
    "SELECT * FROM states WHERE states.id = ?", [state_id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // console.log("hello there");
        const state = results[0].state;
        // console.log(state);
        pool.query(
          "UPDATE subadmins SET name = ?, mobile_number = ?, state = ?, city = ? WHERE id = ?",
          [name, mobile_number, state, city, id],
          (err, results) => {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else {
              // Redirect back to the manage garage list

              res.redirect("/subadmins/list");
            }
          }
        );
      }
    }
  )
  // pool.query(
  //   "UPDATE subadmins SET name = ?, mobile_number = ?, state = ?, password = ? WHERE id = ?",
  //   [name, mobile_number, state, city, password, id],
  //   (err, results) => {
  //     if (err) {
  //       console.error(err);
  //       res.sendStatus(500);
  //     } else {
  //       // Redirect back to the manage garage list

  //       res.redirect("/subadmins/list");
  //     }
  //   }
  // );
};

// Edit SubAdmin Page
const editSubAdminPage = async (req, res) => {
  const id = req.params.id;
  // Fetch data from the "subadmins" table of particular garage
  pool.query(`SELECT * FROM subadmins WHERE id = ${id}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const subAdmin = results[0];
      pool.query(`SELECT * FROM states`, (err, results) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          const states = results;

          // Render the editSubAdminPage.ejs with SubAdmin data
          res.render("editSubAdminPage", { subAdmin, states });
        }
      });
    }
  });
};

// Delete SubAdmins
const deleteSubAdmins = async (req, res) => {
  const subAdminId = req.params.id;
  const deleted = 1;
  pool.query(
    `UPDATE subadmins SET deleted = ${deleted} WHERE id = ${subAdminId}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Redirect back to the manage garage list
        res.redirect("/subadmins/list");
      }
    }
  );
};

// Manage SubAdmin Page
const listSubAdmins = async (req, res) => {
  // Fetch data from the "subadmins" table
  pool.query("SELECT * FROM subadmins WHERE deleted = 0", (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageSubAdminPage.ejs with SubAdmins data
      const added = req.query.added === '1';
      res.render("manageSubAdminPage", { subadmins: results, added });
    }
  });
};

const getCitiesByStateId = (req, res) => {
  const stateId = req.params.stateId;
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

module.exports = {
  registerSubAdmins,
  editSubAdmins,
  deleteSubAdmins,
  listSubAdmins,
  editSubAdminPage,
  addSubAdminsPage,
  getCitiesByStateId,
  updatePassword,
  validateInputs,
};
