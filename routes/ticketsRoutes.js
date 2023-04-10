const express = require("express");
const router = express.Router();

const {
  createTickets,
  editTickets,
  deleteTickets,
  listTickets,
} = require("../controllers/ticketsAPI");

router.route("/create").post(createTickets);
router.route("/edit/:id").put(editTickets);
router.route("/delete/:id").delete(deleteTickets);
router.route("/list").get(listTickets);

module.exports = router;
