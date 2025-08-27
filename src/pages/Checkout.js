import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { saveOrder } from '../utils/saveOrder';

const CheckoutContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 60px 40px;
  background-color: #f9f9f9;
  color: #1a1b1f;
  width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
`;

const CheckoutButton = styled.button`
  padding: 14px 40px;
  font-size: 16px;
  background-color: #1a1b1f;
  color: #fff;
  border: none;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.3s ease;
  margin-right: 15px;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  align-items: center;
`;

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 6px;
  flex-shrink: 0;
`;

const CartItemInfo = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const CartItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 2;
  justify-content: flex-end;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  width: 38px;
  height: 38px;
  font-size: 20px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  text-align: center;
  font-size: 16px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #900;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const StepNavigation = styled.div`
  margin-top: 20px;
`;

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postcode: '',
  });

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.id]: e.target.value });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    const { data, error } = await saveOrder({
      userEmail: shipping.email,
      cartItems,
      total: subtotal,
      shippingAddress: shipping,
    });

    if (error) {
      alert('There was an error placing your order. Please try again.');
      return;
    }

    alert('Order placed successfully!');
    clearCart();
    setStep(1);
  };

  return (
    <CheckoutContainer>
      <Header />
      <MainContent>
        <Title>Checkout</Title>

        {step === 1 && (
          <Section>
            <h2>Review Your Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <CartItem key={item.id}>
                  <CartItemImage
                    src={item.product_image_url}
                    alt={item.product_title}
                  />
                  <CartItemInfo>
                    <strong>{item.product_title}</strong>
                    <br />
                    Price: ${item.price.toFixed(2)}
                  </CartItemInfo>
                  <CartItemControls>
                    <QuantitySelector>
                      <QuantityButton
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        −
                      </QuantityButton>
                      <QuantityInput
                        type="number"
                        value={item.quantity}
                        min={1}
                        max={item.product_inventory}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            Math.min(
                              Math.max(1, Number(e.target.value)),
                              item.product_inventory
                            )
                          )
                        }
                      />
                      <QuantityButton
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product_inventory}
                      >
                        +
                      </QuantityButton>
                    </QuantitySelector>
                    <RemoveButton onClick={() => removeFromCart(item.id)}>
                      Remove
                    </RemoveButton>
                  </CartItemControls>
                </CartItem>
              ))
            )}
            <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
            <StepNavigation>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onClick={() => setStep(2)}
              >
                Continue to Shipping
              </CheckoutButton>
            </StepNavigation>
          </Section>
        )}

        {step === 2 && (
          <Section>
            <h2>Shipping Information</h2>
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              value={shipping.name}
              onChange={handleShippingChange}
              placeholder="John Doe"
            />
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              value={shipping.email}
              onChange={handleShippingChange}
              placeholder="you@example.com"
            />
            <Label htmlFor="address">Shipping Address</Label>
            <Input
              type="text"
              id="address"
              value={shipping.address}
              onChange={handleShippingChange}
              placeholder="123 Main Street"
            />
            <Label htmlFor="city">City</Label>
            <Input
              type="text"
              id="city"
              value={shipping.city}
              onChange={handleShippingChange}
              placeholder="London"
            />
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              type="text"
              id="postcode"
              value={shipping.postcode}
              onChange={handleShippingChange}
              placeholder="E1 6AN"
            />
            <StepNavigation>
              <CheckoutButton onClick={() => setStep(1)}>Back to Cart</CheckoutButton>
              <CheckoutButton
                onClick={() => setStep(3)}
                disabled={
                  !shipping.name ||
                  !shipping.email ||
                  !shipping.address ||
                  !shipping.city ||
                  !shipping.postcode
                }
              >
                Continue to Payment
              </CheckoutButton>
            </StepNavigation>
          </Section>
        )}

        {step === 3 && (
          <Section>
            <h2>Payment</h2>
            <p>Payment integration coming soon!</p>
            <h3>Order Summary</h3>
            <p>Items: {cartItems.length}</p>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>
              Shipping to: {shipping.address}, {shipping.city},{' '}
              {shipping.postcode}
            </p>
            <StepNavigation>
              <CheckoutButton onClick={() => setStep(2)}>Back to Shipping</CheckoutButton>
              <CheckoutButton onClick={handlePlaceOrder}>Place Order</CheckoutButton>
            </StepNavigation>
          </Section>
        )}
      </MainContent>
      <Footer />
    </CheckoutContainer>
  );
};

export default Checkout;
