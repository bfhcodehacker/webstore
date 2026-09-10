import '../styles/ProductIndex.css';
import { useQuery } from "@tanstack/react-query";
import datasource from "../datasource/datasource";
import { ProductIndexComponent } from '../components/ProductIndex';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../slices/cartSlice';


export function Deals() {
  const dispatch = useAppDispatch();
  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: datasource.fetchProducts
  })

  return (
    <>
      <div className='product-index-header'>
        <h1 className='product-index-title'>
          Deals
        </h1>
      </div>
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
