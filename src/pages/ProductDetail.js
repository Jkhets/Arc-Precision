import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';


const PageWrapper = styled.div`
  background-color: #fff;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  display: flex;
  gap: 60px;
  color: #000;
`;

const Image = styled.img`
  width: 500px;
  height: 500px;
  object-fit: contain;
  border: 1px solid #ccc;
  padding: 10px;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
`;

const Price = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Availability = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
  color: ${({ inStock }) => (inStock ? '#090' : '#900')};
  font-weight: 600;
`;

const ActionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  width: 160px;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuantityButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 0 14px;
  cursor: pointer;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.3s ease;
  height: 38px;
  line-height: 38px;

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
  margin: 0 8px;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid #ccc;
  padding: 0;
  height: 38px;
  line-height: 38px;
  pointer-events: none;
  background-color: #f9f9f9;
  box-sizing: border-box;
`;

const CTAButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 14px 0;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  margin-top: 10px;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
      } else {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const inventory = product.product_inventory ?? 0;
  const isInStock = inventory > 0;

  const getAvailabilityText = () => {
    if (inventory === 0) return 'Out of Stock';
    if (inventory < 4) return `Only ${inventory} left`;
    return 'In Stock';
  };

  const incrementQuantity = () => {
    if (quantity < inventory) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <PageWrapper>
      <Header />
      <Container>
        <Image src={product.product_image_url} alt={product.product_title} />
        <Info>
          <Title>{product.product_title}</Title>
          <Description>{product.product_description}</Description>
          <Price>${product.price.toFixed(2)}</Price>
          <Availability inStock={isInStock}>{getAvailabilityText()}</Availability>

          <ActionGroup>
            {isInStock && (
              <QuantitySelector>
                <QuantityButton onClick={decrementQuantity} disabled={quantity <= 1}>−</QuantityButton>
                <QuantityInput type="text" value={quantity} readOnly />
                <QuantityButton onClick={incrementQuantity} disabled={quantity >= inventory}>+</QuantityButton>
              </QuantitySelector>
            )}
            <CTAButton onClick={handleAddToCart} disabled={!isInStock}>
              Add to Cart
            </CTAButton>
            {added && <SuccessMessage>Added to cart!</SuccessMessage>}
          </ActionGroup>
        </Info>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default ProductDetail;
