import { useEffect, useState } from "react";
import classes from "./Group.module.css"

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/api/groups")
      .then((res) => res.json())
      .then(setGroups);
  }, []);

  const joinGroup = async (groupid) => {
    const userid = 1; // Replace with logged-in user ID
    await fetch(`http://localhost:5500/api/groups/${groupid}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid }),
    });
    alert("You have joined the group!");
  };

  return (
    <section className={classes.communityGroupsPage}>
      <h1>All Community Groups</h1>
      <div className={classes.groupList}>
        {groups.map((g) => (
          <div key={g.groupid} className={classes.groupCard}>
            <h3>{g.name}</h3>
            <p>{g.description}</p>
            <button onClick={() => joinGroup(g.groupid)}>Join</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Groups;
