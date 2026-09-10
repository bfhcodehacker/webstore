import axios from "axios";
import type { Category } from "../types/categoryTypes";
import type { HomeProducts, Product, Products } from "../types/productTypes";
import type { AuthUser, UserDetails } from '../types/authTypes';
import type { Recipe, RecipesResponse } from '../types/recipeTypes';

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

  fetchRecipes = async (limit = 10, skip = 0): Promise<RecipesResponse> => {
    const response = await axiosClient.get<RecipesResponse>('recipes', { params: { limit, skip } });
    return response.data;
  }

  fetchRecipe = async (id: string): Promise<Recipe> => {
    const response = await axiosClient.get<Recipe>(`recipes/${id}`);
    return response.data;
  }

  searchRecipes = async (query: string, limit = 10, skip = 0): Promise<RecipesResponse> => {
    const response = await axiosClient.get<RecipesResponse>('recipes/search', { params: { q: query, limit, skip } });
    return response.data;
  }

  fetchRecipeTags = async (): Promise<string[]> => {
    const response = await axiosClient.get<string[]>('recipes/tags');
    return response.data;
  }

  fetchRecipesByTag = async (tag: string, limit = 10, skip = 0): Promise<RecipesResponse> => {
    const response = await axiosClient.get<RecipesResponse>(`recipes/tag/${encodeURIComponent(tag)}`, { params: { limit, skip } });
    return response.data;
  }

  fetchRecipesByMeal = async (meal: string, limit = 10, skip = 0): Promise<RecipesResponse> => {
    const response = await axiosClient.get<RecipesResponse>(`recipes/meal-type/${encodeURIComponent(meal)}`, { params: { limit, skip } });
    return response.data;
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
