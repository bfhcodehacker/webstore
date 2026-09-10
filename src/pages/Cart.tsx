import '../styles/Cart.css';
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import type { CartProduct } from '../types/cartTypes.ts/cartTypes';
import defaultImage from '../assets/5191452-200.png';
import { decrementCartItem, incrementCartItem, removeFromCart } from '../slices/cartSlice';

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(amount);

export function Cart() {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((state) => state.cart.cartCount);
  const cart = useAppSelector((state) => state.cart.cart);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const updateQuantity = (id: number | undefined, action: 'increase' | 'decrease') => {
    if (id === undefined) return;
    dispatch(action === 'increase' ? incrementCartItem({ id }) : decrementCartItem({ id }));
  };

  const removeItem = (id: number | undefined) => {
    if (id !== undefined) dispatch(removeFromCart({ id }));
  };

  const renderCartItem = (item: CartProduct) => {
    const { product, quantity } = item;
    const title = product.title || 'Product';

    return (
      <article className='cart-item' key={product.id ?? title}>
        <Link className='cart-item-image-link' to={`/product/${product.id}`} aria-label={`View ${title}`}>
          <img
            src={product.images?.[0] || defaultImage}
            className='cart-item-image'
            alt={title}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = defaultImage;
            }}
          />
        </Link>
        <div className='cart-item-content'>
          <div className='cart-item-heading'>
            <div>
              <Link className='cart-item-title' to={`/product/${product.id}`}>{title}</Link>
              <div className='cart-item-unit-price'>{formatCurrency(product.price || 0)} each</div>
            </div>
            <button className='cart-remove-button' type='button' onClick={() => removeItem(product.id)} aria-label={`Remove ${title} from cart`}>
              <span className='material-icons-outlined' aria-hidden='true'>delete</span>
              <span>Remove</span>
            </button>
          </div>

          <div className='cart-item-footer'>
            <div className='quantity-control' aria-label={`Quantity for ${title}`}>
              <button type='button' onClick={() => updateQuantity(product.id, 'decrease')} aria-label={`Decrease quantity of ${title}`}>
                <span className='material-icons' aria-hidden='true'>remove</span>
              </button>
              <span className='quantity-value' aria-live='polite' aria-atomic='true'>
                <span className='visually-hidden'>Quantity: </span>{quantity}
              </span>
              <button type='button' onClick={() => updateQuantity(product.id, 'increase')} aria-label={`Increase quantity of ${title}`}>
                <span className='material-icons' aria-hidden='true'>add</span>
              </button>
            </div>
            <div className='cart-item-total' aria-live='polite'>{formatCurrency((product.price || 0) * quantity)}</div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className='cart-container'>
      <header className='cart-header'>
        <Link className='cart-logo' to='/' aria-label='Super WebStore home'>Super WebStore</Link>
        <Link className='continue-shopping' to='/'>
          <span className='material-icons' aria-hidden='true'>arrow_back</span>
          Continue Shopping
        </Link>
      </header>

      <main className='cart-main'>
        <div className='cart-title-row'>
          <h1>Shopping Cart</h1>
          <span aria-live='polite'>{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
        </div>

        {cart.length === 0 ? (
          <div className='empty-cart'>
            <span className='material-icons-outlined' aria-hidden='true'>shopping_cart</span>
            <h2>Your cart is empty</h2>
            <p>Explore our products and add something you love.</p>
            <Link className='empty-cart-btn' to='/'>Continue Shopping</Link>
          </div>
        ) : (
          <div className='cart-layout'>
            <section className='cart-items' aria-label='Items in your cart'>
              {cart.map(renderCartItem)}
            </section>

            <aside className='cart-summary' aria-labelledby='order-summary-heading'>
              <h2 id='order-summary-heading'>Order Summary</h2>
              <dl aria-live='polite'>
                <div><dt>Subtotal</dt><dd>{formatCurrency(subtotal)}</dd></div>
                <div><dt>Tax (10%)</dt><dd>{formatCurrency(tax)}</dd></div>
                <div className='cart-summary-total'><dt>Total</dt><dd>{formatCurrency(total)}</dd></div>
              </dl>
              <Link className='checkout-button' to='/checkout'>Proceed to Checkout</Link>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
