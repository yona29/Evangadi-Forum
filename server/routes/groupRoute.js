const express = require("express");
const router = express.Router();
const {
  getAllGroups,
  toggleGroupMembership,
} = require("../controller/groupController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes
router.get("/", authMiddleware, getAllGroups);
router.post("/:groupid/toggle", authMiddleware, toggleGroupMembership);

module.exports = router;
