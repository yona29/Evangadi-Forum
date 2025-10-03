import classes from "./Footer.module.css";
import logo from "../../assets/footlogo.png";
// import { Link } from "react-router-dom";

// Import Material UI Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <section className={classes.footer_container}>
      {/* Logo + Social Media */}
      <div>
        <a href="#">
          <img className={classes.eva_logo} src={logo} alt="Evangadi Logo" />
        </a>
        <div className={classes.footer_links}>
          {/* Social Links */}
          <a
            href="https://www.facebook.com/evangaditech"
            target="_blank"
            rel="noopener noreferrer">
            <FacebookIcon fontSize="large" />
          </a>
          <a
            href="https://www.instagram.com/evangaditech/"
            target="_blank"
            rel="noopener noreferrer">
            <InstagramIcon fontSize="large" />
          </a>
          <a
            href="https://www.youtube.com/@EvangadiTech"
            target="_blank"
            rel="noopener noreferrer">
            <YouTubeIcon fontSize="large" />
          </a>
        </div>
      </div>

      {/* Useful Links */}
      <div className={classes.useful_links}>
        <h1>Useful Links</h1>
        <ul>
          <li>
            <a href="/how-it-works">How it works</a>
          </li>
          <li>
            <a href="#">Terms of service</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className={classes.contact_info}>
        <h1>Contact Info</h1>
        <ul>
          <li>Evangadi Networks</li>
          <li>support@evangadi.com</li>
          <li>+1-202-386-2702</li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
