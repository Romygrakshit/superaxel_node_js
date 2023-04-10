const express = require("express");
const router = express.Router();

const {
  registerClubs,
  editClubsData,
  editClubsImages,
  deleteClubs,
  listClubs,
  addClubPage,
  editClubPage,
  addGalleryImages,
  updateBannerImage,
  deleteImage,
  updateGalleryImage,
  updateClubPassword,
} = require("../controllers/clubsAPI");

router.route("/register").post(registerClubs);
router.route("/add").get(addClubPage);
router.route("/edit").put(editClubsData);
router.route("/edit/password").put(updateClubPassword);
router.route("/edit/images/gallery").put(addGalleryImages);
router.route("/edit/update/images/Banner").put(updateBannerImage);
router.route("/edit/update/images/gallery").put(updateGalleryImage);
router.route("/delete/images").put(deleteImage);
router.route("/edit/images/:id").put(editClubsImages);
router.route("/edit/page/:id").get(editClubPage);
router.route("/delete/:id").put(deleteClubs);
router.route("/list").get(listClubs);

module.exports = router;
