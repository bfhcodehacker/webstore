export type Products = {
  total?: number;
  skip?: number;
  limit?: number;
  products?: Product[];
}

export type Product = {
  id?:                   number;
  title?:                string;
  description?:          string;
  category?:             string;
  price?:                number;
  discountPercentage?:   number;
  rating?:               number;
  stock?:                number;
  tags?:                 string[];
  brand?:                string;
  sku?:                  string;
  weight?:               number;
  dimensions?:           Dimensions;
  warrantyInformation?:  string;
  shippingInformation?:  string;
  availabilityStatus?:   string;
  reviews?:              Review[];
  returnPolicy?:         string;
  minimumOrderQuantity?: number;
  meta?:                 Meta;
  images?:               string[];
  thumbnail?:            string;
}

export type Dimensions = {
  height?: number;
  depth?:  number;
}

export type Meta = {
  createdAt?: Date;
  updatedAt?: Date;
  barcode?:   string;
  qrCode?:    string;
}

export type Review = {
  rating?:        number;
  comment?:       string;
  date?:          Date;
  reviewerName?:  string;
  reviewerEmail?: string;
}

export type ProductDetail = {
  title: string;
  text?: string;
}

export type HomeProducts = {
  featured: Product[];
  deals: Product[];
}