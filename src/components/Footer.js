import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #111;
  color: #fff;
  padding: 40px 20px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Links = styled.div`
  margin: 20px 0;

  a {
    color: #aaa;
    text-decoration: none;
    margin: 0 10px;
    font-size: 0.9rem;

    &:hover {
      color: #fff;
    }
  }
`;

const Copyright = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-top: 20px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <h3>Arc Precision</h3>
        <Links>
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </Links>
        <Copyright>
          &copy; {new Date().getFullYear()} Arc Precision. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
