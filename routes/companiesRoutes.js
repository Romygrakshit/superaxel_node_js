const express = require("express");
const router = express.Router();

const {
  createCompany,
  editCompany,
  deleteCompany,
  listCompany,
  addCompanyPage,
  editCompanyPage,
} = require("../controllers/companiesAPI");
  
router.route("/create").post(createCompany);
router.route("/edit").put(editCompany);
router.route("/delete/:id").delete(deleteCompany);
router.route("/list").get(listCompany);
router.route("/add").get(addCompanyPage);
router.route("/edit/page/:id").get(editCompanyPage);

module.exports = router;
