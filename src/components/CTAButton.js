import styled from 'styled-components';

const Button = styled.button`
  background-color: #000;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  padding: 15px 40px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 0;

  &:hover {
    background-color: #333;
  }
`;

const CTAButton = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default CTAButton;