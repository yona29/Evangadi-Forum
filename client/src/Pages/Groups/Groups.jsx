import { useEffect, useState } from "react";
import classes from "./Group.module.css";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5500/api/groups", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`); //if the HTTP is successful 
        const data = await res.json();
        setGroups(data);
      } catch (err) {
        console.error(err);
        setErrorMessage("Failed to load groups.");
      }
    };

    fetchGroups();
  }, []);

  const toggleJoin = async (groupid) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5500/api/groups/${groupid}/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      // Update state with new join status and member count
      setGroups((prev) =>
        prev.map((g) =>
          g.groupid === groupid
            ? {
                ...g,
                joined: data.status === "joined",
                memberCount: data.memberCount,
              }
            : g
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to join/leave the group.");
    }
  };

  return (
    <section className={classes.communityGroupsPage}>
      <h1>All Community Groups</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className={classes.groupList}>
        {groups.length > 0 ? (
          groups.map((g) => (
            <div key={g.groupid} className={classes.groupCard}>
              <h3>{g.name}</h3>
              <p>{g.description}</p>
              <p>Members: {g.memberCount}</p>
              <button onClick={() => toggleJoin(g.groupid)}>
                {g.joined ? "Leave" : "Join"}
              </button>
            </div>
          ))
        ) : (
          <p>No groups found.</p>
        )}
      </div>
    </section>
  );
};

export default Groups;
