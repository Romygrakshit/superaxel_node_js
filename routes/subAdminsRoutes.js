const express = require("express");
const router = express.Router();

const {
  registerSubAdmins,
  addSubAdminsPage,
  editSubAdmins,
  deleteSubAdmins,
  listSubAdmins,
  editSubAdminPage,
  validateInputs,
  // upload,
} = require("../controllers/subAdminsAPI");

router.route("/register").post(validateInputs, registerSubAdmins);

router.route("/add").get(addSubAdminsPage);
router.route("/edit").put(editSubAdmins);
router.route("/edit/page/:id").get(editSubAdminPage);
router.route("/delete/:id").put(deleteSubAdmins);
router.route("/list").get(listSubAdmins);
// router.route("/upload").post(upload);

module.exports = router;
