import '../styles/Cart.css';
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { CartProduct } from '../types/cartTypes.ts/cartTypes';
import defaultImage from '../assets/5191452-200.png';
import { decrementCartItem, incrementCartItem } from '../slices/cartSlice';

export function Cart() {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(state => state.cart.cartCount);
  const cart = useAppSelector(state => state.cart.cart);

  console.log('cart data', cartCount, cart);

  const renderEmptyCart = () => {
    return (
      <div className='empty-cart'>
        There are no items in your Cart
        <Link className='empty-cart-btn' to='/'>Continue Shopping</Link>
      </div>
    );
  }

  const increaseCartItem = (id?: number) => () => {
    if (id) {
      dispatch(incrementCartItem({id}));
    }
  }

  const decreaseCartItem = (id?: number) => () => {
    if (id) {
      dispatch(decrementCartItem({id}));
    }
  }

  const renderStepper = (item: CartProduct) => {
    return (
      <div className='stepper'>
        <button className='stepper-button' onClick={increaseCartItem(item.product.id)}>+</button>
        <div className='quantity-display'>
          qty: 
          <div className='stepper-qty'>{item.quantity}</div>
        </div>
        <button className='stepper-button' onClick={decreaseCartItem(item.product.id)}>-</button>
      </div>
    )
  }

  const renderCartItem = (item: CartProduct) => {
    const { product } = item;
    return (
      <div className='cart-item' key={product.title}>
        <img src={item.product.images?.[0] || defaultImage} className='cart-item-image' />
        <div className='cart-item-box'>
          <div className='cart-item-title'>{product.title}</div>
          <div className='cart-item-price'>{product.price}</div>
          <div className='cart-item-info'>
            {product.price && (
              <div className='cart-item-total'>Total: ${(product.price * item.quantity).toFixed(2)}</div>
            )}
            {renderStepper(item)}
          </div>
        </div>
      </div>
    )
  }

  const renderCart = () => {
    return (
      <div className='cart-items'>
        {cart.map(renderCartItem)}
      </div>
    )
  }

  return (
    <div className='cart-container'>
      <header className='cart-header'>
        <Link className='cart-logo' to='/'>Super WebStore</Link>
        <Link className='continue-shopping' to='/'>Continue Shopping</Link>
      </header>
      <main>
        {cartCount ? renderCart() : renderEmptyCart()}
      </main>
    </div>
  );
}