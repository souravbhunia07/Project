const express = require("express");

const {
    createEvent,
    getAdminEvents,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/admin/events")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminEvents);

router
  .route("/admin/event/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createEvent);

router
  .route("/admin/event/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateEvent)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteEvent);


module.exports = router;