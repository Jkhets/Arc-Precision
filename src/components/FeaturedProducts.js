import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 


const Section = styled.section`
  background-color: #000;
  padding: 60px 20px;
  text-align: center;
  color: white;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #aaa;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 40px;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: white;
    margin-top: 30px;
  }
`;

const GridWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0px;
`;

const Card = styled.div`
  background: #111;
  border: 1px solid #222;
  border-radius: 0;
  padding: 20px;
  text-align: left;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: contain;
  border-radius: 5px;
  padding: 10px;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin: 15px 0 10px;
  font-weight: 400;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 10px;
`;

const Price = styled.span`
  font-size: 1rem;
  color: #aaa;
`;

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Section>
      <Title>Featured Products</Title>
      <Subtitle>Check out new and popular products.</Subtitle>
      <GridWrapper>
        <Grid>
          {products.slice(0, 3).map((product, index) => (
            <Link
              key={index}
              to={`/product/${product.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card>
                <ProductImage src={product.product_image_url} alt={product.product_title} />
                <ProductTitle>{product.product_title}</ProductTitle>
                <Description>{product.product_description}</Description>
                <Price>${product.price.toFixed(2)}</Price>
              </Card>
            </Link>
          ))}
        </Grid>
      </GridWrapper>
    </Section>
  );
};

export default FeaturedProducts;
