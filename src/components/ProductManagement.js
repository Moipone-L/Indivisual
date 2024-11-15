// src/components/ProductManagement.js
import React, { useState } from 'react';
import axios from 'axios';
import '../style.css'; // Use this to style the form like your registration form

function ProductManagement() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    quantity: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/products/add', newProduct)
      .then((response) => {
        alert('Product added successfully!');
        setNewProduct({ name: '', description: '', category: '', price: 0, quantity: 0 });
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  return (
    <div className="product-management">
      <h2>Add a New Product</h2>
      <form onSubmit={addProduct} className="product-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
}

export default ProductManagement;
