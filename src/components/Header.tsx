import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import '../styles/Header.css';
import { useAppSelector } from '../app/hooks';

const navigation = [
  { to: '/categories', label: 'Categories' },
  { to: '/deals', label: 'Deals' },
  { to: '/recipes', label: 'Recipes' },
];

function Header() {
  const navigate = useNavigate();
  const cartCount = useAppSelector((state) => state.cart.cartCount);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchText.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSearchText('');
    }
  };

  return (
    <header className='site-header'>
      <div className='header-container'>
        <button
          className='mobile-menu-button header-icon-button'
          type='button'
          aria-label='Open navigation menu'
          aria-expanded={menuOpen}
          aria-controls='primary-navigation'
          onClick={() => setMenuOpen(true)}
        >
          <span className='material-icons-outlined' aria-hidden='true'>menu</span>
        </button>

        <Link className='home-logo' to='/' aria-label='Super WebStore home'>
          Super WebStore
        </Link>

        <form className='header-search' role='search' onSubmit={submitSearch}>
          <label className='visually-hidden' htmlFor='header-product-search'>Search products</label>
          <span className='material-icons-sharp' aria-hidden='true'>search</span>
          <input
            id='header-product-search'
            type='search'
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder='Search products'
          />
          <button type='submit' aria-label='Submit product search' disabled={!searchText.trim()}>
            <span className='material-icons' aria-hidden='true'>arrow_forward</span>
          </button>
        </form>

        <nav className='desktop-navigation' aria-label='Primary navigation'>
          <ul>
            {navigation.map((item) => (
              <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className='header-actions'>
          <Link className='header-icon-button account-link' to='/account' aria-label='Your account'>
            <span className='material-icons-outlined' aria-hidden='true'>account_circle</span>
          </Link>
          <Link className='header-icon-button cart-link' to='/cart' aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}>
            <span className='material-icons-outlined' aria-hidden='true'>shopping_cart</span>
            {cartCount > 0 && <span className='cart-count' aria-hidden='true'>{cartCount > 99 ? '99+' : cartCount}</span>}
          </Link>
        </div>
      </div>

      {menuOpen && <button className='mobile-menu-backdrop' type='button' aria-label='Close navigation menu' onClick={closeMenu} />}
      <aside className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`} id='primary-navigation' aria-label='Mobile navigation' aria-hidden={!menuOpen}>
        <div className='mobile-menu-heading'>
          <strong>Menu</strong>
          <button className='header-icon-button' type='button' aria-label='Close navigation menu' onClick={closeMenu}>
            <span className='material-icons-outlined' aria-hidden='true'>close</span>
          </button>
        </div>
        <nav aria-label='Mobile primary navigation'>
          <ul>
            <li><Link to='/account' onClick={closeMenu}>Account</Link></li>
            {navigation.map((item) => (
              <li key={item.to}><Link to={item.to} onClick={closeMenu}>{item.label}</Link></li>
            ))}
          </ul>
        </nav>
      </aside>
    </header>
  );
}

export default Header;
