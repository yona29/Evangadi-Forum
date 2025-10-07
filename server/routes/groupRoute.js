


const express = require("express");
const router = express.Router();
const db = require("../db/dbConfig");

// ✅ Get all groups - The root path for /api/groups
router.get("/", async (req, res) => {
  console.log("--> GET /api/groups route hit"); // Debug log
  try {
    const [groups] = await db.query("SELECT * FROM groups");
    res.json(groups);
  } catch (err) {
    console.error("Error fetching groups:", err);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

// ✅ Join a group
router.post("/:groupid/join", async (req, res) => {
  const { groupid } = req.params;
  const { userid } = req.body; // user ID from frontend

  try {
    await db.query(
      "INSERT IGNORE INTO user_groups (userid, groupid) VALUES (?, ?)",
      [userid, groupid]
    );
    res.json({ message: "User joined group successfully" });
  } catch (err) {
    console.error("Error joining group:", err);
    res.status(500).json({ error: "Failed to join group" });
  }
});

// ✅ Leave a group
router.delete("/:groupid/leave", async (req, res) => {
  const { groupid } = req.params;
  const { userid } = req.body;

  try {
    await db.query("DELETE FROM user_groups WHERE userid = ? AND groupid = ?", [
      userid,
      groupid,
    ]);
    res.json({ message: "User left group successfully" });
  } catch (err) {
    console.error("Error leaving group:", err);
    res.status(500).json({ error: "Failed to leave group" });
  }
});

module.exports = router;


















