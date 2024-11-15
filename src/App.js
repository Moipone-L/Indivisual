import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductManagement from './components/ProductManagement';
import AuthForm from './components/AuthForm';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Dashboard from './components/Dashboard';
import './style.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // Using localStorage to persist the token
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for products
  const [error, setError] = useState(''); // Error state to handle any errors from API calls

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);  // Start loading
      await axios.post('http://localhost:5000/add-product', {
        name,
        quantity,
        price,
        description,
      });
      fetchProducts(); // Fetch products after adding new one
      setName('');
      setQuantity('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product. Please try again.'); // Show error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const fetchProducts = async () => {
    setLoading(true);  // Start loading
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.'); // Show error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts(); // Fetch products only if token is available
    }
  }, [token]);  // Fetch products when the token changes (e.g., after login)

  return (
    <div className="App">
      <h1>Wings Inventory System</h1>
      {!token ? (
        <AuthForm setToken={setToken} />
      ) : (
        <>
          <h2>Welcome, you are logged in!</h2>
          <UserForm />
          <UserList />
          <ProductManagement
            name={name}
            setName={setName}
            quantity={quantity}
            setQuantity={setQuantity}
            price={price}
            setPrice={setPrice}
            description={description}
            setDescription={setDescription}
            addProduct={addProduct}
            loading={loading}
          />
          {error && <p className="error-message">{error}</p>} {/* Show error message if any */}
          <Dashboard products={products} loading={loading} />
        </>
      )}
    </div>
  );
};

export default App;
