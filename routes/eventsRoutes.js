const express = require("express");
const router = express.Router();

const {
  createEvents,
  editEvents,
  deleteEvents,
  listEvents,
} = require("../controllers/eventsAPI");

router.route("/create").post(createEvents);
router.route("/edit/:id").put(editEvents);
router.route("/delete/:id").delete(deleteEvents);
router.route("/list").get(listEvents);

module.exports = router;
