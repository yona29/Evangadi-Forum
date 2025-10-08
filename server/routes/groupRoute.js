const express = require("express");
const router = express.Router();
const {
  getAllGroups,
  toggleGroupMembership,
} = require("../controllers/groupController");
const authMiddleware = require("../middleware/authMiddleware");

// Protect all routes with auth
router.use();

// Routes
router.get("/", authMiddleware, getAllGroups);
router.post("/:groupid/toggle", authMiddleware, toggleGroupMembership);

module.exports = router;
