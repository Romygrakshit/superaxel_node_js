const express = require("express");
const router = express.Router();

const {
  newInventory,
  addInventoryPage,
  editInventory,
  deleteInventory,
  listInventoryAdmin,
  editInventoryPage,
  changeInventory,
} = require("../controllers/inventoryAPI");

router.route("/register").post(newInventory);
router.route("/add").get(addInventoryPage);
router.route("/edit").put(editInventory);
router.route("/change").put(changeInventory);
router.route("/edit/page/:id").get(editInventoryPage);
router.route("/delete/:id").put(deleteInventory);
router.route("/list/sub").put(listInventoryAdmin);
router.route("/list").get(listInventoryAdmin);
router.route("/list/:id").get(listInventoryAdmin);

module.exports = router;
