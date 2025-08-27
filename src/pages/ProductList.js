import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';


const PageWrapper = styled.div`
  background-color: #fff;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  max-width: 1400px; 
  margin: 40px auto 0 auto;
  padding: 40px 20px 120px 20px; // top, right, bottom, left
`;

const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3 products per row
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); // 2 products per row on tablets
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // 1 product per row on mobile
  }
`;

const ProductCard = styled(Link)`
  text-decoration: none;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: contain;
  background-color: #f9f9f9;
`;

const ProductInfo = styled.div`
  padding: 16px;
`;

const ProductTitle = styled.h2`
  font-size: 1.1rem;
  margin: 0 0 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <PageWrapper>
      <Header />
      <Container>
        <h1>All Products</h1>
        <ProductsWrapper>
          {products.map((product) => (
            <ProductCard to={`/product/${product.id}`} key={product.id}>
              <ProductImage src={product.product_image_url} alt={product.product_title} />
              <ProductInfo>
                <ProductTitle>{product.product_title}</ProductTitle>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsWrapper>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default ProductList;
