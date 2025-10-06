import React from 'react'
import classes from "./About.module.css"
import { useNavigate } from "react-router-dom";



const About = () => {
    const navigate = useNavigate();

    const handleClick=() =>{
        navigate("/how-it-works")
    }
  return (
    <div className={classes.aboutContainer}>
        <h3 className={classes.aboutTxt}>About</h3>
      <h1 className={classes.aboutTitle}>Evangadi Networks Q&A</h1>
      <p className>
        No matter what stage of life you are in, whether you're just starting elementary school or being promoted to CEO of a Fortune company, you have much to offer to those who are trying to follow in your footsteps.
      </p>
      <p className>
        Whether you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
      </p>
      <button className={classes.howItWorks} onClick={handleClick}>
        How IT WORKS
      </button>
    </div>
  );
}

export default About