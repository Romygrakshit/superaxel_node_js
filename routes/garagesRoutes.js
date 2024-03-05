
const express = require("express");
const router = express.Router();
const garageAPI = require("../controllers/api/garageAPI");

const {
  registerGarages,
  editGaragesData,
  deleteGarages,
  listGarages,
  addGaragePage,
  editGaragePage,
  updateProfileImage,
  deleteImage,
  updateGaragePassword,
  getCitiesByStateId,
} = require("../controllers/garagesAPI");

router.route("/register").post(registerGarages);
router.route("/add").get(addGaragePage);
router.route("/edit").put(editGaragesData);
router.route("/edit/password").put(updateGaragePassword);
router.route("/edit/update/images/profile").put(updateProfileImage);
router.route("/delete/images").put(deleteImage);

// Corrected route definition for getCitiesByStateId
router.get("/get-cities/:stateId", getCitiesByStateId);
// router.get("/get-cities/:stateId",garageAPI.getCitiesByStateId);
router.route("/edit/page/:id").get(editGaragePage);
router.route("/delete/:id").put(deleteGarages);
router.route("/list").get(listGarages);
router.post("/api/create", garageAPI.register_garage);
router.post("/api/signIn", garageAPI.login_garage);
router.get("/api/states", garageAPI.getAllStates);
router.post("/api/verify", garageAPI.verify);
router.post("/api/loginSubAdmin", garageAPI.loginSubAdmin);
router.post("/api/cars", garageAPI.getCars);
router.post("/api/price", garageAPI.getPrice);
router.post("/api/productprice", garageAPI.getProductPrice);
router.post("/api/getProductEnquryById", garageAPI.getProductEnquiryById);
router.post('/api/updateFCMToken', garageAPI.updateFCMToken);

module.exports = router;

