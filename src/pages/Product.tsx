import '../styles/ProductPage.css';
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"
import datasource from "../datasource/datasource";
import defaultImage from '../assets/5191452-200.png';

export function Product() {
  const params = useParams();
  const queryKey = params.id ? 'product' + params.id : 'empty-product-key';
  const productQuery = useQuery({
    queryKey: [queryKey, params.id],
    queryFn: () => datasource.fetchProduct(params.id || '')
  });

  const renderProduct = () => {
    const { data } = productQuery;

    if (!data) {
      return (
        <div>Sorry, there was a problem loading this item</div>
      )
    }

    return (
      <div className='product-data-container'>
        <h1 className='product-page-title'>{data.title}</h1>
        <div className='product-page-info'>
          <div className='product-page-left'>
            <img src={data.images?.[0] || defaultImage} className='product-page-image' />
            <div className='product-page-price'>{data.price && `Price: $${data.price}`}</div>
          </div>
          <div className='product-page-data-box'>
            <div className='product-page-description'>{data.description && data.description}</div>
          </div>
        </div>
      </div>
    );
  }

  const renderLoading = () => {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className='product-page-container'>
      {productQuery.isPending && renderLoading()}
      {productQuery.data && renderProduct()}
    </div>
  )
}