const express = require("express");
const router = express.Router();

const {
  createCars,
  editCars,
  deleteCars,
  listCars,
  addCarsPage,
  editCarsPage,
  updateInventory,
} = require("../controllers/carsAPI");

router.route("/create").post(createCars);
router.route("/edit").put(editCars);
router.route("/update/inventory").put(updateInventory);
router.route("/delete/:id").delete(deleteCars);
router.route("/list").get(listCars);
router.route("/add").get(addCarsPage);
router.route("/edit/page/:id").get(editCarsPage);

module.exports = router;
