import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import datasource from "../datasource/datasource";
import { ProductComponent } from "../components/Product";

export function ProductIndex() {
  const params = useParams();
  const queryKey = params.category ? `plp-${params.category}` : 'empty-key';
  const plpQuery = useQuery({
    queryKey: [queryKey, params.category],
    queryFn: () => datasource.fetchCategory(params.category || '')
  });

  console.log('plpquery', plpQuery.data);

  const renderProduct = () => {
    return (
      plpQuery.data?.products?.map(ProductComponent)
    )
  }

  return (
    <div className='product-index-container'>
      Welcome to the product index page {params.category}
      {plpQuery.data?.products && renderProduct()}
    </div>
  );
}