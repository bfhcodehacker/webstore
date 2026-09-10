import '../styles/InformationPages.css';
import { Link } from 'react-router';

export function About() {
  return (
    <main className='information-page'>
      <section className='information-hero' aria-labelledby='about-heading'>
        <span className='information-eyebrow'>About us</span>
        <h1 id='about-heading'>Shopping made simple</h1>
        <p>Super WebStore brings products from a wide range of categories together in one convenient, easy-to-use shop.</p>
      </section>

      <section className='information-content' aria-labelledby='our-store-heading'>
        <div className='information-copy'>
          <h2 id='our-store-heading'>Our store</h2>
          <p>We built Super WebStore to make discovering everyday products straightforward. Browse featured picks, explore current deals, search the full catalog, and manage your order from a responsive shopping experience.</p>
          <p>Our focus is clear product information, accessible navigation, and a checkout journey that works across desktop, tablet, and mobile devices.</p>
          <Link className='information-action' to='/categories'>Explore Categories</Link>
        </div>

        <div className='information-values' aria-label='What we value'>
          <article>
            <span className='material-icons-outlined' aria-hidden='true'>inventory_2</span>
            <h3>Variety</h3>
            <p>A broad catalog makes it easy to find products for different needs.</p>
          </article>
          <article>
            <span className='material-icons-outlined' aria-hidden='true'>verified</span>
            <h3>Clarity</h3>
            <p>Useful product details help shoppers make informed decisions.</p>
          </article>
          <article>
            <span className='material-icons-outlined' aria-hidden='true'>devices</span>
            <h3>Accessibility</h3>
            <p>An inclusive, responsive experience keeps shopping within reach.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
