import React from "react";
import styles from "./Header.module.css"
import logo from "../../assets/evangadiLogo.png"


const Header = () => {
  return (
    <header>
      {/* <p>This is the header part.</p> */}
      <section className={styles.header_container}>
        <div className={styles.logo_container}>
          <a href="www.evangadi.com">
            <img src={logo} />{" "}
          </a>
        </div>

        <div className={styles.links}>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/how-it-works">How it Works</a>
            </li>
            <li>
              <a href="/login">
                <button className={`${styles.blue_bg} ${styles.signin}`}>SIGN IN</button>
              </a>
            </li>
            <li className={styles.links}>
              <a href="logout">
                <button className={`${styles.blue_bg} ${styles.logout}`}>logOut</button>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </header>
  );
};

export default Header;
