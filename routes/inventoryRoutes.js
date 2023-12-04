const express = require("express");
const router = express.Router();
const garageApi = require("../controllers/api/inventoryAPI.js");

const {
  newInventory,
  addInventoryPage,
  editInventory,
  deleteInventory,
  listInventoryAdmin,
  editInventoryPage,
  changeInventory,
  getCarsByCompanyId
} = require("../controllers/inventoryAPI");

router.route("/register").post(newInventory);
router.route("/add").get(addInventoryPage);
router.route("/edit").put(editInventory);
router.route("/change").put(changeInventory);
router.route("/list/:id").get(listInventoryAdmin);
router.route("/edit/page/:id").get(editInventoryPage);
router.route("/api/list/:id").get(garageApi.listInventorySubadmin);
router.get("/get-cars/:companyId", getCarsByCompanyId);
router.route("/list/delete/:id").put(deleteInventory);
router.route("/list/sub").put(listInventoryAdmin);
router.route("/list").get(listInventoryAdmin);

module.exports = router;
