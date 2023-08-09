const express = require("express");
const router = express.Router();
const garageApi = require("../controllers/api/enquiryAPI");

const {
  newEnquires,
  listEnquires,
  editEnquiryPage,
  addEnquiryPage,
  updateEnquiry,
  getCitiesByStateId,
  getCarsByCompanyId,
  deleteEnquiry,
  updateEnquiryImage,
  deleteEnquiryImage,
} = require("../controllers/enquiresAPI");

router.route("/register").post(newEnquires);
router.route("/add").get(addEnquiryPage);
router.route("/update").put(updateEnquiry);
router.route("/edit/page/:id").get(editEnquiryPage);
router.route("/list").get(listEnquires);
router.route("/delete/:id").put(deleteEnquiry);
router.get("/get-cities/:stateId", getCitiesByStateId);
router.route("/edit/update/images").put(updateEnquiryImage);
router.route("/edit/delete/images").put(deleteEnquiryImage);
router.get("/get-cars/:companyId", getCarsByCompanyId);
router.get("/api/list", garageApi.listEnquires);
router.post("/api/create", garageApi.newEnquires); 

module.exports = router;
