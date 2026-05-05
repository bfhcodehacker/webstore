import '../styles/Product.css';
import { Link } from "react-router";
import type { Product } from "../types/productTypes";
import defaultImage from '../assets/5191452-200.png';

export const ProductComponent = (product: Product) => {
  return (
    <Link className='product-container' to='Product' key={product.title}>
      <img src={product?.images?.[0] || defaultImage} className='product-image' />
      <div className='product-title'>
        {product.title}
      </div>
    </Link>
  );
}