import '../styles/ProductComponent.css';
import { Link } from "react-router";
import type { Product } from "../types/productTypes";
import defaultImage from '../assets/5191452-200.png';

type ProductComponentProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductComponent = ({ product, onAddToCart }: ProductComponentProps) => {
  return (
    <article className={`product-container${onAddToCart ? ' product-container--with-action' : ''}`}>
      <Link className='product-link' to={`product/${product.id}`}>
        <img src={product?.images?.[0] || defaultImage} className='product-image' alt={product.title || 'Product'} />
        <div className='product-title'>
          {product.title}
        </div>
      </Link>
      {onAddToCart && (
        <button className='product-add-to-cart' onClick={() => onAddToCart(product)} aria-label={`Add ${product.title || 'product'} to cart`}>
          Add To Cart
        </button>
      )}
    </article>
  );
}
