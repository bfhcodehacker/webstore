import '../styles/InformationPages.css';

export function Contact() {
  return (
    <main className='information-page'>
      <section className='information-hero' aria-labelledby='contact-heading'>
        <span className='information-eyebrow'>Contact us</span>
        <h1 id='contact-heading'>How can we help?</h1>
        <p>Reach our support team using any of the options below. We’ll be happy to help with products, orders, or general questions.</p>
      </section>

      <section className='contact-options' aria-label='Contact options'>
        <article className='contact-card'>
          <span className='material-icons-outlined' aria-hidden='true'>email</span>
          <h2>Email</h2>
          <p>For general questions and order support.</p>
          <a href='mailto:support@superwebstore.example'>support@superwebstore.example</a>
        </article>
        <article className='contact-card'>
          <span className='material-icons-outlined' aria-hidden='true'>phone</span>
          <h2>Phone</h2>
          <p>Available Monday–Friday, 9:00 AM–5:00 PM ET.</p>
          <a href='tel:+18005550199'>1 (800) 555-0199</a>
        </article>
        <article className='contact-card'>
          <span className='material-icons-outlined' aria-hidden='true'>location_on</span>
          <h2>Mailing address</h2>
          <address>
            Super WebStore<br />
            123 Market Street<br />
            New York, NY 10001
          </address>
        </article>
      </section>
    </main>
  );
}
