import '../styles/ProductIndex.css';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import datasource from '../datasource/datasource';
import { ProductIndexComponent } from '../components/ProductIndex';
import { RequestState } from '../components/RequestState';
import { getRequestErrorMessage, shouldRetryRequest } from '../utils/requestError';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() || '';
  const searchQuery = useQuery({
    queryKey: ['product-search', query],
    queryFn: () => datasource.searchProducts(query),
    enabled: Boolean(query),
    retry: shouldRetryRequest,
  });

  return (
    <main className='product-search-page'>
      <div className='product-index-header'>
        <h1 className='product-index-title'>Search Results</h1>
        {query && <p>Results for “{query}”</p>}
        {searchQuery.isSuccess && <div className='product-index-results' aria-live='polite'>{searchQuery.data.total || 0} {(searchQuery.data.total || 0) === 1 ? 'result' : 'results'}</div>}
      </div>

      {!query && <RequestState title='Enter a search term' message='Use the search field in the header to find products.' icon='search' />}
      {query && searchQuery.isPending && <RequestState title='Searching products...' icon='hourglass_empty' />}
      {query && searchQuery.isError && <RequestState title='Unable to search products' message={getRequestErrorMessage(searchQuery.error, 'search results')} isRetrying={searchQuery.isFetching} onRetry={() => searchQuery.refetch()} />}
      {query && searchQuery.isSuccess && !searchQuery.data.products?.length && <RequestState title='No products found' message={`Try a different search for “${query}”.`} icon='search_off' />}

      {searchQuery.data?.products && searchQuery.data.products.length > 0 && (
        <section className='product-index-container' aria-label={`Product results for ${query}`}>
          {searchQuery.data.products.map((product) => (
            <ProductIndexComponent key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}
