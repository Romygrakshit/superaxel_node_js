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
const createSubCategory = async (req, res) => {
  const { name, order_number, parent_category_id } = req.body;
  pool.query(
    "INSERT INTO sub_categories SET ?",
    {
      name,
      order_number,
      parent_category_id,
    },
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/sub/categories/list");
      }
    }
  );
};

const editSubCategory = async (req, res) => {
  const { name, order_number, parent_category_id, id } = req.body;

  // Update category to database
  pool.query(
    "UPDATE sub_categories SET name = ?, order_number = ?, parent_category_id = ? WHERE id = ?",
    [name, order_number, parent_category_id, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.redirect("/sub/categories/list");
      }
    }
  );
};

// Delete category
const deleteSubCategory = async (req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM sub_categories WHERE id = ${id}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.redirect("/sub/categories/list");
    }
  });
};
// category List
const listSubCategory = async (req, res) => {
  pool.query("SELECT * FROM sub_categories", (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageusers.hbs template with the user data
      res.render("manageSubCategoriesPage", { subCategories: results });
    }
  });
};
const addSubCategoryPage = async (req, res) => {
  res.render("addSubCategoriesPage.ejs");
};
const editSubCategoryPage = async (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM sub_categories WHERE id =${id}`, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Render the manageusers.hbs template with the user data
      const subCategory = results[0];
      res.render("editSubCategoriesPage.ejs", { subCategory });
    }
  });
};
module.exports = {
  createSubCategory,
  editSubCategory,
  deleteSubCategory,
  listSubCategory,
  editSubCategoryPage,
  addSubCategoryPage,
};
