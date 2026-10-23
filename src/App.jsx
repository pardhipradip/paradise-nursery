import { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItem from './CartItem';

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'plants' | 'cart'

  if (page === 'plants') return <ProductList setPage={setPage} />;
  if (page === 'cart') return <CartItem setPage={setPage} />;

  return (
    <div className="landing">
      <div className="landing-overlay">
        <h1>Paradise Nursery</h1>
        <p>Where green meets serenity</p>
        <button className="get-started" onClick={() => setPage('plants')}>
          Get Started
        </button>
      </div>
      <AboutUs />
    </div>
  );
}