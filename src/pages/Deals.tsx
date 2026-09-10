import '../styles/ProductIndex.css';
import { useQuery } from "@tanstack/react-query";
import datasource from "../datasource/datasource";
import { ProductIndexComponent } from '../components/ProductIndex';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../slices/cartSlice';
import { RequestState } from '../components/RequestState';
import { getRequestErrorMessage, shouldRetryRequest } from '../utils/requestError';


export function Deals() {
  const dispatch = useAppDispatch();
  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: datasource.fetchProducts,
    retry: shouldRetryRequest,
  })

  return (
    <main className='deals-page'>
      <div className='product-index-header'>
        <h1 className='product-index-title'>
          Deals
        </h1>
        <p>Discover our current offers and add your favorites directly to your cart.</p>
      </div>
      {productQuery.isPending && <RequestState title='Loading deals...' icon='hourglass_empty' />}
      {productQuery.isError && <RequestState title='Unable to load deals' message={getRequestErrorMessage(productQuery.error, 'deals')} isRetrying={productQuery.isFetching} onRetry={() => productQuery.refetch()} />}
      {productQuery.isSuccess && !productQuery.data?.deals?.length && <RequestState title='No deals available' message='Please check back later.' icon='inventory_2' />}
      <section className='product-index-container' aria-label='Products on sale'>
        {productQuery.data?.deals?.map((product) => (
          <ProductIndexComponent
            key={product.id}
            product={product}
            onAddToCart={(selectedProduct) => dispatch(addToCart({ product: selectedProduct }))}
          />
        ))}
      </section>
    </main>
  );
}
