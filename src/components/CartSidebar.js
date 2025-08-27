import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-5500px')};
  width: 400px;
  height: 100vh;
  background: #fff;
  box-shadow: -2px 0 5px rgba(0,0,0,0.3);
  padding: 30px 20px;
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  overflow-y: auto;
  font-family: 'Montserrat', sans-serif;
`;

const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0,0,0,0.5);
  z-index: 999;
`;

const Item = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
`;

const Details = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  margin: 0 0 8px 0;
  font-size: 1rem;
`;

const Price = styled.p`
  margin: 2px 0;
  color: #333;
`;

const RemoveBtn = styled.button`
  background: transparent;
  color: #900;
  border: none;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const Subtotal = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 30px;
`;

const CheckoutBtn = styled(Link)`
  display: block;
  margin-top: 20px;
  background: #000;
  color: #fff;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  transition: background 0.3s;

  &:hover {
    background: #333;
  }
`;

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <Sidebar isOpen={isOpen}>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <Item key={item.id}>
              <ProductImage src={item.product_image_url} alt={item.product_title} />
              <Details>
                <Title>{item.product_title}</Title>
                <Price>Quantity: {item.quantity}</Price>
                <Price>Price: ${(item.price * item.quantity).toFixed(2)}</Price>
                <RemoveBtn onClick={() => removeFromCart(item.id)}>Remove</RemoveBtn>
              </Details>
            </Item>
          ))
        )}
        <Subtotal>Subtotal: ${subtotal.toFixed(2)}</Subtotal>
        {cartItems.length > 0 && <CheckoutBtn to="/checkout">Go to Checkout</CheckoutBtn>}
      </Sidebar>
    </>
  );
};

export default CartSidebar;
