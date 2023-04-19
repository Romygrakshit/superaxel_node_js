const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "partypal",
});

const validateInputs = [
  check("name").notEmpty().withMessage("Name is required"),
  check("mobile_number")
    .isMobilePhone()
    .isLength({ min: 10 })
    .withMessage("Invalid mobile number"),
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address"),
  check("age").isInt().withMessage("Age must be a number"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
// Register User
const registerUsers = async (req, res) => {
  const { name, mobile_number, email, age, password } = req.body;

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
      // Add user to database

      pool.query(
        "INSERT INTO users SET ?",
        {
          name,
          mobile_number,
          email,
          age,
          password: hash,
        },
        (err, results) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            // Redirect back to the manage user list

            res.redirect("/users/list");
          }
        }
      );
    }
  });
};
// Add User Page
const addUsersPage = async (req, res) => {
  res.render("addUserPage");
};

// Edit User
const editUsers = async (req, res) => {
  const { id, name, mobile_number, email, age } = req.body;
  // Update user to database
  pool.query(
    "UPDATE users SET name = ?, mobile_number = ?, email = ?, age = ? WHERE id = ?",
    [name, mobile_number, email, age, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Redirect back to the manage user list

        res.redirect("/users/list");
      }
    }
  );
};

// Edit User Page
const editUserPage = async (req, res) => {
  const id = req.params.id;
  // Fetch data from the "users" table of particular user
  pool.query(`SELECT * FROM users WHERE id = ${id}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the editUserPage.ejs with User data
      const user = results[0];
      res.render("editUserPage", { user });
    }
  });
};

// Delete Users
const deleteUsers = async (req, res) => {
  const userid = req.params.id;
  const deleted = 1;
  pool.query(
    `UPDATE users SET deleted = ${deleted} WHERE id = ${userid}`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Redirect back to the manage user list
        res.redirect("/users/list");
      }
    }
  );
};

// Manage User Page
const listUsers = async (req, res) => {
  // Fetch data from the "users" table
  pool.query("SELECT * FROM users WHERE deleted = 0", (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageUserPage.ejs with Users data
      res.render("manageUserPage", { users: results });
    }
  });
};

module.exports = {
  registerUsers,
  editUsers,
  deleteUsers,
  listUsers,
  editUserPage,
  addUsersPage,
  validateInputs,
};
