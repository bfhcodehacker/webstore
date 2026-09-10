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
    <>
      <div className='product-index-header'>
        <h1 className='product-index-title'>
          Deals
        </h1>
      </div>
      {productQuery.isPending && <RequestState title='Loading deals...' icon='hourglass_empty' />}
      {productQuery.isError && <RequestState title='Unable to load deals' message={getRequestErrorMessage(productQuery.error, 'deals')} isRetrying={productQuery.isFetching} onRetry={() => productQuery.refetch()} />}
      {productQuery.isSuccess && !productQuery.data?.deals?.length && <RequestState title='No deals available' message='Please check back later.' icon='inventory_2' />}
      <div className='product-index-container'>
        {productQuery.data?.deals?.map((product) => (
          <ProductIndexComponent
            key={product.id}
            product={product}
            onAddToCart={(selectedProduct) => dispatch(addToCart({ product: selectedProduct }))}
          />
        ))}
      </div>
    </>
  );
}
