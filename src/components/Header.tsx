import { Link } from "react-router"
import { useState } from "react";
import '../styles/Header.css'


function Header() {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  }

  return (
    <header>
      <div className='desktop-header'>
        <div className='title-row'>
          <Link className='home-logo' to='/'>Super WebStore</Link>
          <div className='header-links'>
            <div className='search-input'>
              <span className='material-icons-sharp search-icon'>search</span>
              <span className='search-text'>Search for products</span>
            </div>
            <Link className='cart-link' to='cart'>
              <span className="material-icons-outlined header-icon">shopping_cart</span>
            </Link>
            <Link className='account-link' to='account'>
              <span className="material-icons-outlined header-icon">account_circle</span>
            </Link>
          </div>
        </div>
        <nav>
          <li>
            <ul>
              <Link to='categories'>Categories</Link>
            </ul>
            <ul>
              <Link to='deals'>Deals</Link>
            </ul>
            <ul>
              <Link to='recipes'>Recipes</Link>
            </ul>
          </li>
        </nav>
      </div>
      <div className='mobile-header'>
        <div className='mobile-title-row'>
          <span onClick={toggleSidebar} className="material-icons-outlined header-icon">menu</span>
          <Link className='home-logo' to='/'>Super WebStore</Link>
          <Link className='cart-link' to='cart'>
            <span className="material-icons-outlined header-icon">shopping_cart</span>
          </Link>
        </div>
        <div className='mobile-search-input'>
          <span className='material-icons-sharp search-icon'>search</span>
          <span className='search-text'>Search for products</span>
        </div>
      </div>
      <div className={`side-bar ${sidebarActive ? 'active' : ''}`}>
        <div onClick={toggleSidebar} className='close-sidebar'>
          <span className="material-icons-outlined">close</span>
        </div>
        <nav>
          <li>
            <ul>
              <Link to='account' onClick={toggleSidebar}>Account</Link>
            </ul>
            <ul>
              <Link to='categories' onClick={toggleSidebar}>Categories</Link>
            </ul>
            <ul>
              <Link to='deals' onClick={toggleSidebar}>Deals</Link>
            </ul>
            <ul>
              <Link to='recipes' onClick={toggleSidebar}>Recipes</Link>
            </ul>
          </li>
        </nav>
      </div>
    </header>
  )
}

export default Header;