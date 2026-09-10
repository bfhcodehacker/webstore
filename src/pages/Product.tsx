import '../styles/ProductPage.css';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router"
import axios from 'axios';
import datasource from "../datasource/datasource";
import defaultImage from '../assets/5191452-200.png';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../slices/cartSlice';
import { StarRating } from '../components/StarRating';

export function Product() {
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});
  const dispatch = useAppDispatch();
  const params = useParams();
  const queryKey = params.id ? 'product' + params.id : 'empty-product-key';
  const productQuery = useQuery({
    queryKey: [queryKey, params.id],
    queryFn: () => datasource.fetchProduct(params.id!),
    enabled: Boolean(params.id),
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response && error.response.status < 500) return false;
      return failureCount < 2;
    },
  });

  const addProductToCart = () => {
    if (productQuery.data) {
      dispatch(addToCart({product: productQuery.data}));
    }
  }

  const toggleDetail = (detail: string) => {
    setExpandedDetails((current) => ({ ...current, [detail]: !current[detail] }));
  };

  const getErrorMessage = () => {
    const error = productQuery.error;

    if (!axios.isAxiosError(error)) {
      return 'Something unexpected happened while loading this product.';
    }
    if (error.code === 'ECONNABORTED') {
      return 'The request took too long. Please check your connection and try again.';
    }
    if (!error.response) {
      return 'We could not connect to the store. Check your internet connection and try again.';
    }
    if (error.response.status === 404) {
      return 'This product could not be found. It may no longer be available.';
    }
    if (error.response.status >= 500) {
      return 'The store is temporarily unavailable. Please try again in a moment.';
    }
    return 'We could not load this product. Please try again.';
  };

  const renderIssue = (title: string, message: string, canRetry = true) => (
    <div className='product-page-status' role='alert'>
      <span className='material-icons product-page-status-icon' aria-hidden='true'>error_outline</span>
      <h1>{title}</h1>
      <p>{message}</p>
      <div className='product-page-status-actions'>
        {canRetry && (
          <button type='button' onClick={() => productQuery.refetch()} disabled={productQuery.isFetching}>
            {productQuery.isFetching ? 'Trying Again...' : 'Try Again'}
          </button>
        )}
        <Link to='/'>Return Home</Link>
      </div>
    </div>
  );

  const renderProduct = () => {
    const { data } = productQuery;

    if (!data) {
      return (
        <div>Sorry, there was a problem loading this item</div>
      )
    }

    const details: { key: string; label: string; value: ReactNode }[] = [
      ...(data.brand ? [{ key: 'brand', label: 'Brand', value: data.brand }] : []),
      ...(data.category ? [{ key: 'category', label: 'Category', value: data.category }] : []),
      ...(data.discountPercentage !== undefined ? [{ key: 'discount', label: 'Discount', value: `${data.discountPercentage}%` }] : []),
      ...(data.stock !== undefined ? [{ key: 'stock', label: 'Stock', value: data.stock }] : []),
      ...(data.tags?.length ? [{ key: 'tags', label: 'Tags', value: data.tags.join(', ') }] : []),
      ...(data.sku ? [{ key: 'sku', label: 'SKU', value: data.sku }] : []),
      ...(data.weight !== undefined ? [{ key: 'weight', label: 'Weight', value: data.weight }] : []),
      ...(data.dimensions ? [{
        key: 'dimensions',
        label: 'Dimensions',
        value: [data.dimensions.width, data.dimensions.height, data.dimensions.depth]
          .filter((dimension) => dimension !== undefined)
          .join(' × '),
      }] : []),
      ...(data.warrantyInformation ? [{ key: 'warranty', label: 'Warranty', value: data.warrantyInformation }] : []),
      ...(data.shippingInformation ? [{ key: 'shipping', label: 'Shipping Information', value: data.shippingInformation }] : []),
      ...(data.availabilityStatus ? [{ key: 'availability', label: 'Availability', value: data.availabilityStatus }] : []),
      ...(data.returnPolicy ? [{ key: 'returns', label: 'Return Policy', value: data.returnPolicy }] : []),
      ...(data.minimumOrderQuantity !== undefined ? [{ key: 'minimum-order', label: 'Minimum Order Quantity', value: data.minimumOrderQuantity }] : []),
      ...(data.reviews?.length ? [{
        key: 'reviews',
        label: 'Reviews',
        value: (
          <div className='product-review-list'>
            {data.reviews.map((review, index) => (
              <div className='product-review' key={`${review.reviewerEmail}-${index}`}>
                <strong>{review.reviewerName || 'Customer'} — {review.rating}/5</strong>
                {review.comment && <span>{review.comment}</span>}
                {review.date && <small>{new Date(review.date).toLocaleDateString()}</small>}
              </div>
            ))}
          </div>
        ),
      }] : []),
      ...(data.meta ? [{
        key: 'metadata',
        label: 'Product Metadata',
        value: (
          <div className='product-metadata'>
            {data.meta.barcode && <span><strong>Barcode:</strong> {data.meta.barcode}</span>}
            {data.meta.createdAt && <span><strong>Created:</strong> {new Date(data.meta.createdAt).toLocaleDateString()}</span>}
            {data.meta.updatedAt && <span><strong>Updated:</strong> {new Date(data.meta.updatedAt).toLocaleDateString()}</span>}
            {data.meta.qrCode && <img src={data.meta.qrCode} alt='Product QR code' />}
          </div>
        ),
      }] : []),
    ];

    return (
      <div className='product-data-container'>
        <h1 className='product-page-title'>{data.title}</h1>
        <div className='product-page-info'>
          <div className='product-page-left'>
            <img
              src={data.images?.[0] || defaultImage}
              className='product-page-image'
              alt={data.title || 'Product'}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = defaultImage;
              }}
            />
          </div>
          <div className='product-page-data-box'>
            {data.price !== undefined && (
              <div className='product-page-price'>${data.price.toFixed(2)}</div>
            )}
            {data.rating !== undefined && (
              <StarRating rating={data.rating} />
            )}
            <p className='product-page-description'>{data.description}</p>
            <div className='product-details-section'>
              <h2 className='product-details-heading'>Product Details</h2>
              {details.map((detail) => (
                <div className='product-detail-item' key={detail.key}>
                  <button className='product-details-toggle' type='button' aria-expanded={Boolean(expandedDetails[detail.key])} aria-controls={`${detail.key}-detail`} onClick={() => toggleDetail(detail.key)}>
                    <span>{detail.label}</span>
                    <span className='material-icons' aria-hidden='true'>{expandedDetails[detail.key] ? 'expand_less' : 'expand_more'}</span>
                  </button>
                  {expandedDetails[detail.key] && <div className='product-detail-value' id={`${detail.key}-detail`}>{detail.value}</div>}
                </div>
              ))}
            </div>
            <button onClick={addProductToCart} className='page-add-to-cart'>Add To Cart</button>
          </div>
        </div>
      </div>
    );
  }

  const renderLoading = () => {
    return (
      <div className='product-page-message'>Loading...</div>
    );
  }

  return (
    <div className='product-page-container'>
      {!params.id && renderIssue('Invalid Product', 'No product was specified in this URL.', false)}
      {params.id && productQuery.isPending && renderLoading()}
      {params.id && productQuery.isError && renderIssue('Unable to Load Product', getErrorMessage(), axios.isAxiosError(productQuery.error) ? productQuery.error.response?.status !== 404 : true)}
      {params.id && productQuery.isSuccess && (!productQuery.data?.id || !productQuery.data.title) && renderIssue('Product Data Unavailable', 'The store returned incomplete product information.')}
      {params.id && productQuery.isSuccess && productQuery.data?.id && productQuery.data.title && renderProduct()}
    </div>
  )
}
