import { memo } from "react";
import { Link } from "react-router"
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className='footer-container'>
      <div className='footer-content'>
        <div className='footer-brand'>
          <Link className='footer-logo' to='/' aria-label='Super WebStore home'>Super WebStore</Link>
          <p>Simple shopping, useful details, and great finds.</p>
        </div>
        <nav className='footer-navigation' aria-label='Footer navigation'>
          <h2>Learn more</h2>
          <ul>
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
          </ul>
        </nav>
      </div>
      <div className='footer-bottom'>© {new Date().getFullYear()} Super WebStore</div>
    </footer>
  );
}

export default memo(Footer);
