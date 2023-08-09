const mysql = require("mysql");
// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "superaxel",
});
// create category in database
const createCategory = async (req, res) => {
  const { category_name } = req.body;

  pool.query(
    "INSERT INTO categories SET ?",
    {
      category_name,
    },
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/categories/list?added=1");
      }
    }
  );
};

const editCategory = async (req, res) => {
  const { category_name, id } = req.body;
  pool.query(
    "UPDATE categories SET category_name = ? WHERE id = ?",
    [category_name, id],
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

// Delete Company
const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  pool.query(
    `DELETE FROM categories WHERE id = ${categoryId}`,
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
// Company List
const listCategory = async (req, res) => {
  pool.query("SELECT * FROM categories", (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageusers.hbs template with the user data
      const added = req.query.added === '1';
      res.render("manageCategoriesPage", { categories: results ,added});
    }
  });
};
const addCategoryPage = async (req, res) => {
  res.render("addCategoriesPage.ejs");
};
const editCategoryPage = async (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM categories WHERE id = ?`,[id], (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageusers.hbs template with the user data
      const category_name = results[0];
      // console.log(category_name);
      res.render("editCategoryPage.ejs", { category_name });
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
