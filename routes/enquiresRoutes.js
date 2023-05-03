const express = require("express");
const router = express.Router();
const garageApi = require("../controllers/api/enquiryAPI");

const {
  newEnquires,
  listEnquires,
  editEnquiryPage,
  addEnquiryPage,
  updateEnquiry,
} = require("../controllers/enquiresAPI");

router.route("/register").post(newEnquires);
router.route("/add").get(addEnquiryPage);
router.route("/update").put(updateEnquiry);
router.route("/edit/page/:id").get(editEnquiryPage);
router.route("/list").get(listEnquires);
router.get("/api/list", garageApi.listEnquires);

module.exports = router;
