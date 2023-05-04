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
  z,
} = require("../controllers/garagesAPI");

router.route("/register").post(registerGarages);
router.route("/add").get(addGaragePage);
router.route("/edit").put(editGaragesData);
router.route("/edit/password").put(updateGaragePassword);
router.route("/edit/update/images/profile").put(updateProfileImage);
router.route("/delete/images").put(deleteImage);
router.route("/edit/page/:id").get(editGaragePage);
router.route("/delete/:id").put(deleteGarages);
router.route("/list").get(listGarages);
router.post("/api/create", garageAPI.register_garage);
router.post("/api/signIn", garageAPI.login_garage);

module.exports = router;
