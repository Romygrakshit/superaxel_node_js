const express = require("express");
const router = express.Router();

const {
  registerVendors,
  editVendorsData,
  // editVendorsImages,
  deleteVendors,
  listVendors,
  addVendorPage,
  editVendorPage,
  addGalleryImages,
  updateBannerImage,
  updateHostImage,
  deleteImage,
  updateGalleryImage,
  updateVendorPassword,
} = require("../controllers/vendorsAPI");

router.route("/register").post(registerVendors);
router.route("/add").get(addVendorPage);
router.route("/edit").put(editVendorsData);
router.route("/edit/password").put(updateVendorPassword);
router.route("/edit/images/gallery").put(addGalleryImages);
router.route("/edit/update/images/Banner").put(updateBannerImage);
router.route("/edit/update/images/Banner").put(updateHostImage);
router.route("/edit/update/images/gallery").put(updateGalleryImage);
router.route("/delete/images").put(deleteImage);
// router.route("/edit/images/:id").put(editVendorsImages);
router.route("/edit/page/:id").get(editVendorPage);
router.route("/delete/:id").put(deleteVendors);
router.route("/list").get(listVendors);

module.exports = router;
