const express = require("express");
const router = express.Router();

const {
  createCategory,
  editCategory,
  deleteCategory,
  listCategory,
  addCategoryPage,
  editCategoryPage,
} = require("../controllers/categoriesAPI");

router.route("/create").post(createCategory);
router.route("/edit").put(editCategory);
router.route("/delete/:id").delete(deleteCategory);
router.route("/list").get(listCategory);
router.route("/add").get(addCategoryPage);
router.route("/edit/page/:id").get(editCategoryPage);

module.exports = router;
