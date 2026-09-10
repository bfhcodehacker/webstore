import axios from "axios";
import type { Category } from "../types/categoryTypes";
import type { HomeProducts, Product, Products } from "../types/productTypes";
import type { AuthUser, UserDetails } from '../types/authTypes';

const axiosClient = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 10000
});

const datasource = class {
  fetchCategories = async (): Promise<Category[]> => {
    const response = await axiosClient.get('products/categories');
    return response.data;
  }

  fetchCategory = async (id: string): Promise<Products> => {
    const response = await axiosClient.get(`products/category/${id}`);
    return response.data;
  }

  fetchProducts = async (): Promise<HomeProducts> => {
    const response = await axiosClient.get('products');
    const deals = (response.data.products || []).slice(0, 8);
    const featured = (response.data.products || []).slice(9, 16);

    return { deals, featured };
  }

  fetchProduct = async (id: string): Promise<Product> => {
    const response = await axiosClient.get(`products/${id}`);
    return response.data;
  }

  searchProducts = async (query: string): Promise<Products> => {
    const response = await axiosClient.get('products/search', { params: { q: query } });
    return response.data;
  }

  fetchRecipes = async () => {
    const response = await axiosClient.get('recipes');
    return response.data;
  }

  fetchRecipe = async (id: string) => {
    const response = await axiosClient.get(`recipes/${id}`);
    return response.data;
  }

  searchRecipes = async (query: string) => {
    const response = await axiosClient.get(`recipes/search?q=${query}`);
    return response;
  }

  loginUser = async (username: string, password: string): Promise<AuthUser> => {
    const response = await axiosClient.post<AuthUser>('auth/login', {
      username,
      password,
      expiresInMins: 30,
    });
    return response.data;
  }

  fetchUser = async (id: number): Promise<UserDetails> => {
    const response = await axiosClient.get<UserDetails>(`users/${id}`);
    return response.data;
  }
};

export default new datasource();
