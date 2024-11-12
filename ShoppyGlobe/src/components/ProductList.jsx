// ProductList.js
import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import '../styles.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products); 
        setFilteredProducts(data.products); 
        
        
        const uniqueCategories = ['All', ...new Set(data.products.map(product => product.category))];
        setCategories(uniqueCategories); 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products); 
    } else {
      
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>Loading...</div>;

  return (
    <div className="product-list">
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products">
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
