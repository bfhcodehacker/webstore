import { Link } from "react-router";
import type { Product } from "../types/productTypes";
import defaultImage from '../assets/5191452-200.png';

export const ProductIndexComponent = (product: Product) => {
  return (
    <Link className='productindex-product-container' to={`/product/${product.id}`} key={product.title}>
      <img src={product?.images?.[0] || defaultImage} className='productindex-product-image' />
      <div className='productindex-product-title'>
        {product.title}
      </div>
      <div className='productindex-product-details'>
        <div className='productindex-product-rating'>
          Rating: {product.rating}
        </div>
        <div className='productindex-product-price'>
          ${product.price}
        </div>
      </div>
    </Link>
  );
}