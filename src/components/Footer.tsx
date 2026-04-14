import { memo } from "react";
import { Link } from "react-router"
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className='footer-container'>
      <Link to='about'>About</Link>
      <Link to='contact'>Contact</Link>
    </footer>
  );
}

export default memo(Footer);