import { Link } from "react-router";
import type { Product } from "../types/productTypes";
import defaultImage from '../assets/5191452-200.png';
import { StarRating } from './StarRating';

type ProductIndexComponentProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductIndexComponent = ({ product, onAddToCart }: ProductIndexComponentProps) => {
  return (
    <article className='productindex-product-container'>
      <Link className='productindex-product-link' to={`/product/${product.id}`}>
        <img
          src={product?.images?.[0] || defaultImage}
          className='productindex-product-image'
          alt={product.title || 'Product'}
        />
        <div className='productindex-product-title'>
          {product.title}
        </div>
        <div className='productindex-product-details'>
          {product.rating !== undefined && <StarRating rating={product.rating} />}
          <div className='productindex-product-price'>
            ${product.price}
          </div>
        </div>
      </Link>
      {onAddToCart && (
        <button className='productindex-add-to-cart' onClick={() => onAddToCart(product)} aria-label={`Add ${product.title || 'product'} to cart`}>
          Add To Cart
        </button>
      )}
    </article>
  );
}
