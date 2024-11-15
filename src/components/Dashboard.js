// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement'; // Corrected path

// Registering ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [stockData, setStockData] = useState([]);

  // Fetch stock data from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setStockData(response.data); // Set stock data
      })
      .catch(error => console.error('Error fetching stock data:', error));
  }, []);

  // Prepare data for the Bar chart
  const chartData = {
    labels: stockData.map((item) => item.name),
    datasets: [{
      label: 'Stock Levels',
      data: stockData.map((item) => item.quantity),
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }]
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Display Product Management and User Management components */}
      <ProductManagement />
      <UserManagement />

      {/* Stock Overview */}
      <h2>Stock Overview</h2>
      <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
}

export default Dashboard;
