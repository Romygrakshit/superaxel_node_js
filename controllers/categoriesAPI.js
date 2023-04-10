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
const createCategory = async (req, res) => {
  const { name, order_number } = req.body;

  pool.query(
    "INSERT INTO categories SET ?",
    {
      name,
      order_number,
    },
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/categories/list");
      }
    }
  );
};

const editCategory = async (req, res) => {
  const { name, order_number, id } = req.body;

  pool.query(
    "UPDATE categories SET name = ?, order_number = ? WHERE id = ?",
    [name, order_number, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/categories/list");
      }
    }
  );
};

const updateCategory = async (name, newOrderNumber, id, res) => {
  pool.query(
    "UPDATE categories SET name = ?, order_number = ? WHERE id = ?",
    [name, newOrderNumber, id],
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
const deleteCategory = async (req, res) => {
  const userid = req.params.id;
  pool.query(`DELETE FROM categories WHERE id = ${userid}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.redirect("/categories/list");
    }
  });
};
// category List
const listCategory = async (req, res) => {
  pool.query("SELECT * FROM categories", (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageusers.hbs template with the user data
      res.render("manageCategoriesPage", { categories: results });
    }
  });
};
const addCategoryPage = async (req, res) => {
  res.render("addCategoriesPage.ejs");
};
const editCategoryPage = async (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM categories WHERE id =${id}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageusers.hbs template with the user data
      const category = results[0];
      res.render("editCategoriesPage.ejs", { category });
    }
  });
};
module.exports = {
  createCategory,
  editCategory,
  deleteCategory,
  listCategory,
  addCategoryPage,
  editCategoryPage,
};
