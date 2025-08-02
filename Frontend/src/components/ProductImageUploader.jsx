import React, { useState } from 'react';
import ProductService from '../services/productService';

const ProductCreator = () => {
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    model: '',
    description: '',
    price: '',
    originalPrice: '',
    discount: '',
    stock: '',
    tags: '',
    isFeatured: false,
    mainImage: '',
    images: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreateProduct = async () => {
    try {
      const productPayload = {
        ...productData,
        price: Number(productData.price),
        originalPrice: Number(productData.originalPrice),
        discount: Number(productData.discount),
        stock: Number(productData.stock),
        tags: productData.tags.split(',').map(tag => tag.trim()),
        mainImage: productData.mainImage,
        images: productData.images ? productData.images.split(',').map(img => img.trim()) : []
      };

      const response = await ProductService.createProduct(productPayload);
      
      if (response.success) {
        alert('Product created successfully!');
        console.log('Created product:', response.data);
        
        // Reset form
        setProductData({
          name: '',
          brand: '',
          model: '',
          description: '',
          price: '',
          originalPrice: '',
          discount: '',
          stock: '',
          tags: '',
          isFeatured: false,
          mainImage: '',
          images: ''
        });
      }
    } catch (error) {
      console.error('Product creation error:', error);
      alert('Failed to create product: ' + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Product Creator</h2>
      
      {/* Product Details Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Product Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
          />
          
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={productData.brand}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
          />
          
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={productData.model}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
          />
          
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
          />
          
          <input
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            value={productData.originalPrice}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
          />
          
          <input
            type="number"
            name="discount"
            placeholder="Discount %"
            value={productData.discount}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
          />
          
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={productData.stock}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
          />
          
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={productData.tags}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
          />
          
          <input
            type="url"
            name="mainImage"
            placeholder="Main Image URL"
            value={productData.mainImage}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
          />
        </div>
        
        <input
          type="text"
          name="images"
          placeholder="Additional Image URLs (comma separated)"
          value={productData.images}
          onChange={handleInputChange}
          className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
        />
        
        <textarea
          name="description"
          placeholder="Product Description"
          value={productData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
        />
        
        {/* Image Preview Section */}
        {productData.mainImage && (
          <div className="mt-4">
            <h4 className="text-md font-semibold mb-2">Main Image Preview:</h4>
            <div className="w-48 h-48 border-2 border-gray-600 rounded-lg overflow-hidden">
              <img 
                src={productData.mainImage} 
                alt="Main Preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={productData.isFeatured}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <span>Featured Product</span>
        </label>
        
        <button
          onClick={handleCreateProduct}
          disabled={!productData.name || !productData.brand}
          className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg transition-colors font-semibold"
        >
          Create Product
        </button>
      </div>
    </div>
  );
};

export default ProductCreator;
