const express = require("express");
const router = express.Router();
const garageApi = require("../controllers/api/productAPI");

const {
  createProduct,
  editProduct,
  deleteProduct,
  listProduct,
  addProductPage,
  editProductPage,
  getCarsByCompanyId,
  addProductInventoryPage,
  addProductInventory,
  listProductInventory
} = require("../controllers/productsAPI");

router.route("/create").post(createProduct);
router.route("/edit").put(editProduct);
router.route("/delete/:id").delete(deleteProduct);
router.route("/list").get(listProduct);
router.route("/inventory/list").get(listProductInventory);
router.route("/add").get(addProductPage);
router.route("/edit/page/:id").get(editProductPage);
router.route("/add-inventory/:companyName/:carName").get(addProductInventoryPage);
router.get("/get-cars/:companyId", getCarsByCompanyId);
router.post('/add-inventory',addProductInventory);
router.get("/api/inventory/list", garageApi.listInventory);
router.get("/api/list/:companyName/:carName", garageApi.listProduct);
// router.post("/api/create", garageApi.newEnquires);
// router.post("/api/add-inventory/:companyName/:carName",garageApi.addProductInventoryPage);


module.exports = router;
