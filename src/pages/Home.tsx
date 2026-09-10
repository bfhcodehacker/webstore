import '../styles/Home.css';
import { useQuery } from '@tanstack/react-query';
import datasource from '../datasource/datasource';

import { Link } from 'react-router';
import { CategoryComponent } from '../components/Category';
import { ProductComponent } from '../components/Product';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../slices/cartSlice';
import type { Product } from '../types/productTypes';
import { RequestState } from '../components/RequestState';
import { getRequestErrorMessage, shouldRetryRequest } from '../utils/requestError';

export function HomePage() {
  const dispatch = useAppDispatch();

  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: datasource.fetchCategories,
    retry: shouldRetryRequest,
  });

  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: datasource.fetchProducts,
    retry: shouldRetryRequest,
  })

  const renderCategories = () => {
    const categories = categoryQuery.data?.slice(0, 8);
    return (
      <section className='section-box' aria-labelledby='featured-categories-heading'>
        <h2 className='section-title' id='featured-categories-heading'>Featured Categories</h2>
        <div className='categories-container'>
          {categoryQuery.isPending && <RequestState title='Loading categories...' icon='hourglass_empty' />}
          {categoryQuery.isError && <RequestState title='Unable to load categories' message={getRequestErrorMessage(categoryQuery.error, 'categories')} isRetrying={categoryQuery.isFetching} onRetry={() => categoryQuery.refetch()} />}
          {categoryQuery.isSuccess && !categories?.length && <RequestState title='No categories available' message='Please check back later.' icon='inventory_2' />}
          {categories?.map(CategoryComponent)}
        </div>
      </section>
    )
  }

  const renderProducts = (isFeatured?: boolean) => {
    const products = isFeatured ? productQuery.data?.featured : productQuery.data?.deals;
    const title = isFeatured ? 'Featured Products' : 'Deals';
    const headingId = isFeatured ? 'featured-products-heading' : 'home-deals-heading';
    return (
      <section className='section-box' aria-labelledby={headingId}>
        <h2 className='section-title' id={headingId}>{title}</h2>
        <div className='products-container'>
          {productQuery.isPending && <RequestState title={`Loading ${title.toLowerCase()}...`} icon='hourglass_empty' />}
          {productQuery.isError && <RequestState title={`Unable to load ${title.toLowerCase()}`} message={getRequestErrorMessage(productQuery.error, 'products')} isRetrying={productQuery.isFetching} onRetry={() => productQuery.refetch()} />}
          {productQuery.isSuccess && !products?.length && <RequestState title={`No ${title.toLowerCase()} available`} message='Please check back later.' icon='inventory_2' />}
          {products?.map((product: Product) => (
            <ProductComponent
              key={product.id}
              product={product}
              onAddToCart={isFeatured
                ? (selectedProduct) => dispatch(addToCart({ product: selectedProduct }))
                : undefined}
            />
          ))}
        </div>
      </section>
    )
  }

  return (
    <main className='home-container'>
      <div className='home-main-container'>
        <Link className='home-banner' to='/deals'>
          <span>Shop our Deals</span>
          <span className='material-icons' aria-hidden='true'>arrow_forward</span>
        </Link>
        {renderProducts(true)}
        {renderCategories()}
        {renderProducts()}
      </div>
    </main>
  )
}
