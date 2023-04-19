const express = require("express");
const router = express.Router();

const {
  registerUsers,
  addUsersPage,
  editUsers,
  deleteUsers,
  listUsers,
  editUserPage,
  validateInputs,
  // upload,
} = require("../controllers/userAPI");

router.route("/register").post(validateInputs, registerUsers);

router.route("/add").get(addUsersPage);
router.route("/edit").put(editUsers);
router.route("/edit/page/:id").get(editUserPage);
router.route("/delete/:id").put(deleteUsers);
router.route("/list").get(listUsers);
// router.route("/upload").post(upload);

module.exports = router;
