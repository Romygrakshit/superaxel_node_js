const express = require("express");
const router = express.Router();

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

module.exports = router;
