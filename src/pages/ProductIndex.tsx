import '../styles/ProductIndex.css';
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import datasource from "../datasource/datasource";
import { ProductIndexComponent } from '../components/ProductIndex';


export function ProductIndex() {
  const params = useParams();
  const queryKey = params.category ? `plp-${params.category}` : 'empty-key';
  const plpQuery = useQuery({
    queryKey: [queryKey, params.category],
    queryFn: () => datasource.fetchCategory(params.category || '')
  });

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
        {plpQuery.data?.products && plpQuery.data.products.map(ProductIndexComponent)}
      </div>
    </>
  );
}