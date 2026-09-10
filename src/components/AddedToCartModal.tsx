import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { dismissAddedToCart } from '../slices/cartSlice';
import defaultImage from '../assets/5191452-200.png';
import '../styles/AddedToCartModal.css';

export function AddedToCartModal() {
  const dispatch = useAppDispatch();
  const addedProduct = useAppSelector((state) => state.cart.addedProduct);

  useEffect(() => {
    if (!addedProduct) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dispatch(dismissAddedToCart());
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [addedProduct, dispatch]);

  if (!addedProduct) return null;

  const closeModal = () => dispatch(dismissAddedToCart());

  return (
    <div className='added-to-cart-backdrop' onClick={closeModal}>
      <div
        className='added-to-cart-modal'
        role='dialog'
        aria-modal='true'
        aria-labelledby='added-to-cart-title'
        onClick={(event) => event.stopPropagation()}
      >
        <button className='added-to-cart-close' onClick={closeModal} aria-label='Close'>
          &times;
        </button>
        <h2 id='added-to-cart-title'>Added to Cart</h2>
        <img
          className='added-to-cart-image'
          src={addedProduct.images?.[0] || defaultImage}
          alt={addedProduct.title || 'Added product'}
        />
        <div className='added-to-cart-product-title'>{addedProduct.title}</div>
        <button className='added-to-cart-continue' onClick={closeModal} autoFocus>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
