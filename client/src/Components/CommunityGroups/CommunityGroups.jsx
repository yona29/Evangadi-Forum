import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./CommunityGroup.module.css"

const CommunityGroups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  // calling useEffect inside component
  useEffect(() => {
    fetch("http://localhost:5500/api/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data.slice(0, 3))); // show first 3 groups on the homepage
  }, []);

  const joinGroup = async (groupid) => {
    const userid = 1; // This will be replaced with current logged-in user ID
    await fetch(`http://localhost:5500/api/groups/${groupid}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid }),
    });
    alert("Joined group!");
  };

  return (
    <div className={classes.homepage_groups}>
      <h2>Community Groups</h2>
      <div className={classes.group_list}>
        {groups.map((g) => (
          <div key={g.groupid} className={classes.group_card}>
            <h3>{g.name}</h3>
            <p>{g.description}</p>
            <button onClick={() => joinGroup(g.groupid)}>Join</button>
          </div>
        ))}
      </div>
      {/* When user click the button, they will be taken to "/community-group" page */}
      <button
        className={classes.seeMore_btn}
        onClick={() => navigate("/community-groups")}
      >
        See More Groups
      </button>
    </div>
  );
};

export default CommunityGroups;






