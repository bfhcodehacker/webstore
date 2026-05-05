import '../styles/ProductIndex.css';
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import datasource from "../datasource/datasource";
import type { Product } from '../types/productTypes';
import defaultImage from '../assets/5191452-200.png';

export function ProductIndex() {
  const params = useParams();
  const queryKey = params.category ? `plp-${params.category}` : 'empty-key';
  const plpQuery = useQuery({
    queryKey: [queryKey, params.category],
    queryFn: () => datasource.fetchCategory(params.category || '')
  });

  console.log('plpquery', plpQuery.data);

  const renderProduct = (product: Product) => {
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

  return (
    <>
      <div className='product-index-header'>
        <h1 className='product-index-title'>
          Category: <span className='product-index-category'>{params.category}</span>
        </h1>
        <div className='product-index-results'>
          {plpQuery.data && plpQuery.data.total + ' Results'}
        </div>
      </div>
      <div className='product-index-container'>
        {plpQuery.data?.products && plpQuery.data.products.map(renderProduct)}
      </div>
    </>
  );
}