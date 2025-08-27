import styled, { keyframes } from 'styled-components';
import Slider from 'react-slick';
import Header from '../components/Header';
import Footer from '../components/Footer';
import archeryImg from '../assets/AboutUsImages/archery.jpg';
import officeImg from '../assets/AboutUsImages/office.jpg';
import archery2Img from '../assets/AboutUsImages/archery2.jpg';
import teamImg from '../assets/AboutUsImages/team.jpeg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AboutContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 50px 20px;
  max-width: 1100px;
  margin: 0 auto;
  color: #1a1b1f;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
  animation: ${fadeUp} 1s ease forwards;
`;

const Mission = styled.section`
  margin-bottom: 50px;
  text-align: center;
`;

const MissionText = styled.p`
  font-size: 18px;
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto;
  animation: ${fadeUp} 1.5s ease forwards;
  opacity: 0; /* Start hidden */
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const CarouselContainer = styled.div`
  margin: 50px 0;
  animation: ${fadeUp} 2s ease forwards;
  opacity: 0;
`;

const CarouselImage = styled.img`
  width: calc(100% - 20px);
  margin: 0 10px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;


const sliderSettings = {
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 10000,
  autoplaySpeed: 0,
  cssEase: 'linear',
  pauseOnHover: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 }
    }
  ]
};

const AboutUs = () => {
  const images = [
    archeryImg,
    officeImg,
    archery2Img,
    teamImg,
    archeryImg,
    officeImg,
    archery2Img,
    teamImg
  ];

  return (
    <AboutContainer>
      <Header />
      <MainContent>
        <Title>About Arc Precision</Title>

        <Mission>
          <MissionText>
            At Arc Precision, our journey began with a passion for archery and a dedication to crafting the most precise, durable, 
            and high-performing equipment on the market. From humble beginnings in a small workshop, we have grown into a trusted 
            brand for hunters, competitors, and enthusiasts alike.  
            <br /><br />
            Our mission is simple: <BoldSpan>to help you elevate your aim</BoldSpan>. We combine cutting-edge technology, expert craftsmanship, 
            and relentless innovation to create products that empower you to hit your mark every time.
          </MissionText>
        </Mission>

        <CarouselContainer>
          <Slider {...sliderSettings}>
            {images.map((img, index) => (
              <div key={index}>
                <CarouselImage src={img} alt={`Arc Precision ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </CarouselContainer>

        <Mission>
          <MissionText>
            Every Arc Precision product is built with you in mind — ensuring that whether you’re competing, hunting, or 
            simply enjoying the sport, you can trust your gear to perform flawlessly.  
            <br /><br />
            We’re proud of where we’ve come from, and even more excited about where we’re going.
          </MissionText>
        </Mission>
      </MainContent>
      <Footer />
    </AboutContainer>
  );
};

export default AboutUs;
