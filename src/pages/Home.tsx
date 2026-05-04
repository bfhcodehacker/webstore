import '../styles/Home.css';
import { useQuery } from '@tanstack/react-query';
import datasource from '../datasource/datasource';
import type { Product } from '../types/productTypes';

import defaultImage from '../assets/5191452-200.png';
import { Link } from 'react-router';
import type { Category } from '../types/categoryTypes';
import { categoryIcons } from '../constants/categoryIcons';

export function HomePage() {

  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: datasource.fetchCategories
  });

  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: datasource.fetchProducts
  })

  const renderLoading = () => {
    return <div>...Loading</div>
  }

  console.log('products', productQuery.data);
  console.log('categories', categoryQuery.data);

  const renderCategory = (category: Category) => {
    const slug = category?.slug || 'default';
    const iconName = categoryIcons[slug];
    return (
      <Link className='category-container' to='Category'>
        <span className={`material-icons-sharp ${iconName}`}>{iconName}</span>
        <div className='product-title'>{category.name}</div>
      </Link>
    );
  }

  const renderCategories = () => {
    const categories = categoryQuery.data?.slice(0, 8);
    return (
      <div className='section-box'>
        <div className='section-title'>Featured Categories</div>
        <div className='categories-container'>
          {categoryQuery.isPending && renderLoading()}
          {categories && categories.map(renderCategory)}
        </div>
      </div>
    )
  }

  const renderProduct = (product: Product) => {
    return (
      <Link className='product-container' to='Product'>
          <img src={product?.images?.[0] || defaultImage} className='product-image' />
          <div className='product-title'>
            {product.title}
          </div>
      </Link>
    );
  }

  const renderProducts = (isFeatured?: boolean) => {
    const products = isFeatured ? productQuery.data?.featured : productQuery.data?.deals;
    const title = isFeatured ? 'Featured Products' : 'Deals';
    return (
      <div className='section-box'>
        <div className='section-title'>{title}</div>
        <div className='products-container'>
          {productQuery.isPending && renderLoading()}
          {products && products.map(renderProduct)}
        </div>
      </div>
    )
  }

  return (
    <div className='home-container'>
      <main className='home-main-container'>
        <Link className='home-banner' to='Deals'>Shop our Deals!</Link>
        {!productQuery.isError && renderProducts(true)}         
        {!categoryQuery.isError && renderCategories()}
         {!productQuery.isError && renderProducts()}         
      </main>
    </div>
  )
}