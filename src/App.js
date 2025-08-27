import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import { CartProvider } from './context/CartContext';


const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
