
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles.css';

function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
  
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data); 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id]);


  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <div className="product-images">
        <img src={product.images[0]} alt={product.name} className="main-image" />
        <div className="thumbnail-images">
          {product.images.slice(1).map((image, index) => (
            <img key={index} src={image} alt={`Product thumbnail ${index + 1}`} />
          ))}
        </div>
      </div>
      
      <div className="product-info">
        <h2>Description</h2>
        <p>{product.description}</p>

        <h3>Price: ${product.price}</h3>
        {product.discountPercentage && (
          <p>
            <span className="original-price">${product.price + (product.price * product.discountPercentage / 100)}</span> - {product.discountPercentage}% OFF
          </p>
        )}
        
        <h3>Category: {product.category}</h3>
        <h3>Rating: {product.rating} ★</h3>
        
        <h2>Specifications</h2>
<ul>
  <li>Dimensions: {product.dimensions 
      ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}` 
      : "N/A"}
  </li>
  <li>Weight: {product.weight || "N/A"}</li>
  <li>Battery Life: {product.batteryLife || "N/A"}</li>
  <li>Connectivity: {product.connectivity || "N/A"}</li>
  <li>Color Options: {product.colorOptions ? product.colorOptions.join(", ") : "N/A"}</li>
</ul>


        <h2>Customer Reviews</h2>
        <div className="reviews">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="review">
                <strong>{review.user}</strong>
                <p>Rating: {review.rating} ★</p>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        <h2>Related Products</h2>
        <div className="related-products">
          {product.relatedProducts && product.relatedProducts.length > 0 ? (
            product.relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="related-product-item">
                <p>{relatedProduct.name}</p>
                <p>${relatedProduct.price}</p>
              </div>
            ))
          ) : (
            <p>No related products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
