import api from '../api/axiosInstance.js';

// Get all products with filtering and pagination
export const getAllProducts = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const response = await api.get(`/products${queryParams ? `?${queryParams}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Get products by brand
export const getProductsByBrand = async (brand, params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const response = await api.get(`/products/brand/${brand}${queryParams ? `?${queryParams}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by brand:', error);
    throw error;
  }
};

// Get featured products
export const getFeaturedProducts = async (limit = 8) => {
  try {
    const response = await api.get(`/products/featured/list?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (query, params = {}) => {
  try {
    const queryParams = new URLSearchParams({ query, ...params }).toString();
    const response = await api.get(`/products/search/query?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Get products in price range
export const getProductsInPriceRange = async (minPrice, maxPrice, params = {}) => {
  try {
    const queryParams = new URLSearchParams({ minPrice, maxPrice, ...params }).toString();
    const response = await api.get(`/products/price/range?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products in price range:', error);
    throw error;
  }
};

// Get all product brands
export const getProductBrands = async () => {
  try {
    const response = await api.get('/products/brands/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching product brands:', error);
    throw error;
  }
};

// Add review (requires authentication)
export const addReview = async (productId, rating) => {
  try {
    const response = await api.patch(`/products/${productId}/review`, { rating });
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};
