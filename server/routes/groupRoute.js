const express = require("express");
const router = express.Router();
const db = require("../db/dbConfig");

router.get("/", async (req, res) => {
  const userid = req.user.userid; // from auth middleware
  try {
    const [groups] = await db.query(
      `
      SELECT g.*,
             COUNT(ug.userid) AS memberCount,
             MAX(CASE WHEN ug.userid = ? THEN 1 ELSE 0 END) AS joined
      FROM groups g
      LEFT JOIN user_groups ug ON g.groupid = ug.groupid
      GROUP BY g.groupid
    `,
      [userid]
    );

    // Convert joined from 0/1 to boolean
    const groupsWithJoined = groups.map((g) => ({
      ...g,
      joined: g.joined === 1,
    }));

    res.json(groupsWithJoined);
  } catch (err) {
    console.error("Error fetching groups:", err);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

//Toggle join/leave group for the logged-in user

router.post("/:groupid/toggle", async (req, res) => {
  const { groupid } = req.params;
  const userid = req.user.userid; // from auth middleware

  try {
    // Check if user already joined
    const [existing] = await db.query(
      "SELECT * FROM user_groups WHERE userid = ? AND groupid = ?",
      [userid, groupid]
    );

    let status;
    if (existing.length > 0) {
      // Already joined & leave
      await db.query(
        "DELETE FROM user_groups WHERE userid = ? AND groupid = ?",
        [userid, groupid]
      );
      status = "left";
    } else {
      // Not joined & join
      await db.query(
        "INSERT INTO user_groups (userid, groupid) VALUES (?, ?)",
        [userid, groupid]
      );
      status = "joined";
    }

    // Get updated member count
    const [countResult] = await db.query(
      "SELECT COUNT(*) AS memberCount FROM user_groups WHERE groupid = ?",
      [groupid]
    );
    const memberCount = countResult[0].memberCount;

    res.json({ status, memberCount });
  } catch (err) {
    console.error("Error toggling group join:", err);
    res.status(500).json({ error: "Failed to toggle group join" });
  }
});

module.exports = router;
