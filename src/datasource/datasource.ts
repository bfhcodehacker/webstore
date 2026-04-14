import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 10000
});

const datasource = class {
  fetchCategories = async () => {
    const categories = await axiosClient.get('products/categories');
    return categories;
  }

  fetchCategory = async (id: string) => {
    const products = await axiosClient.get(`products/category/${id}`);
    return products;
  }

  fetchProducts = async () => {
    const products = await axiosClient.get('products');
    const deals = (products.data.products || []).slice(0, 8);
    const featured = (products.data.products || []).slice(9, 16);

    return { deals, featured };
  }

  fetchProduct = async (id: string) => {
    const product = await axiosClient.get(`products/${id}`);
    return product;
  }

  searchProducts = async (query: string) => {
    const products = await axiosClient.get(`products/search?=${query}`);
    return products;
  }

  fetchRecipes = async () => {
    const recipes = await axiosClient.get('recipes');
    return recipes;
  }

  fetchRecipe = async (id: string) => {
    const recipe = await axiosClient.get(`recipes/${id}`);
    return recipe;
  }

  searchRecipes = async (query: string) => {
    const recipes = await axiosClient.get(`recipes/search?q=${query}`);
    return recipes;
  }

  loginUser = async (username: string, password: string) => {
    const body = JSON.stringify({ username, password });
    const loginRequest = axiosClient.post(
      'user/login',
      body,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return loginRequest;
  }
};

export default new datasource();