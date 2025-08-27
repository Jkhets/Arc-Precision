import styled from 'styled-components';
import Header from '../components/Header';
import heroImage from '../assets/arc-precision-hero-hp.jpg';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';


const HeroSection = styled.section`
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 600px;
  padding: 20px;
  border-radius: 8px;
`;

const HeroTitle = styled.h1`
  font-size: 64px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const HeroText = styled.p`
  font-size: 20px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
`;

const CTAButton = styled.button`
  background-color: #fff;
  border: none;
  padding: 12px 30px;
  color: black;
  font-size: 18px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;


const MasterySection = styled.section`
  padding: 80px 20px;
  background-color: white;
  color: #111;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
`;

const MasteryTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MasteryTitle = styled.h2`
  font-size: 48px;
  font-weight: normal;
  display: inline-block;
  position: relative;
  text-align: center;
  padding-bottom: 10px;
  
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #111;
    margin-top: 50px;
  }
`;

const MasteryContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
  text-align: left;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Paragraph = styled.p`
  flex: 1;
  font-size: 16px;
  line-height: 1.6;
  color: #8c8c8c;
  font-weight: 300;
  word-spacing: 0.5px;
  padding: 10px 0;
`;


const Homepage = () => {
  const navigate = useNavigate(); 

  const handleExploreClick = () => {
    navigate('/products'); 
  };

  return (
    <>
      <Header />
      <HeroSection>
        <HeroContent>
          <HeroTitle>Elevate Your Aim</HeroTitle>
          <HeroText>Unleash your potential with every release</HeroText>
          <CTAButton onClick={handleExploreClick}>Explore</CTAButton>
        </HeroContent>
      </HeroSection>

      <MasterySection>
        <MasteryTitleWrapper>
          <MasteryTitle>We'll help you take a step towards Mastery</MasteryTitle>
        </MasteryTitleWrapper>
        <MasteryContent>
          <Paragraph>
            Our journey began with a simple mission: to provide superior archery
            products that enhance accuracy and performance. After countless hours of
            research and testing, we curated a selection of compound bows, arrows, and
            accessories that meet the highest standards of quality. Each product is
            designed to help you elevate your aim and master the art of archery,
            whether you’re a beginner or a seasoned hunter.
          </Paragraph>
          <Paragraph>
            At Arc Precision, we’re empowering a new generation of archers to pursue
            their passion with confidence. Join us as we continue to support and
            inspire archers everywhere in their journey towards mastery. Elevate your
            aim and discover what you’re truly capable of with Arc Precision.
          </Paragraph>
        </MasteryContent>
      </MasterySection>
      <FeaturedProducts />
      <Footer />
    </>
  );
};

export default Homepage;
