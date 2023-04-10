const express = require("express");
const router = express.Router();

const {
  createSubCategory,
  editSubCategory,
  deleteSubCategory,
  listSubCategory,
  addSubCategoryPage,
  editSubCategoryPage,
} = require("../controllers/subCategoriesAPI");

router.route("/create").post(createSubCategory);
router.route("/edit").put(editSubCategory);
router.route("/delete/:id").delete(deleteSubCategory);
router.route("/list").get(listSubCategory);
router.route("/add").get(addSubCategoryPage);
router.route("/edit/page/:id").get(editSubCategoryPage);

module.exports = router;
