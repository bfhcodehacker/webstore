import '../styles/ProductIndex.css';
import { useQuery } from "@tanstack/react-query";
import datasource from "../datasource/datasource";
import { ProductIndexComponent } from '../components/ProductIndex';


export function Deals() {
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
        {productQuery.data?.deals && productQuery.data?.deals.map(ProductIndexComponent)}
      </div>
    </>
  );
}