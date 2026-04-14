import '../styles/Home.css';
import { useQuery } from '@tanstack/react-query';
import datasource from '../datasource/datasource';

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

  const renderCategories = () => {
    return (
      <div className='categories-container'>
        {categoryQuery.isPending && renderLoading()}
        {categoryQuery.data && (
          <div>
            render some categories
          </div>
        )}
      </div>
    )
  }

  const renderProducts = () => {
    return (
      <div className='categories-container'>
        {productQuery.isPending && renderLoading()}
        {productQuery.data && (
          <div>
            render some products
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='home-container'>
      <main>
        here lies the main content
        {!categoryQuery.isError && renderCategories()}
        {!productQuery.isError && renderProducts()}          
      </main>
    </div>
  )
}