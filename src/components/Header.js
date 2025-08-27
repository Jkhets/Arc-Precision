import  { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import CartSidebar from './CartSidebar'; 

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #000;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 24px;
  color: #fff;
  transition: color 0.3s ease;

  a {
    text-decoration: none;
    color: inherit;
  }

  &:hover {
    color: #4a4b4f;
  }
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  margin-right: 30px;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-left: 30px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  padding: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #4a4b4f;
  }
`;

const CTAButton = styled.button`
  background-color: #1a1b1f;
  border: none;
  padding: 12px 40px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  border-radius: 0;
  transition: background-color 0.3s ease;
  position: relative;

  &:hover {
    background-color: #333;
  }
`;

const CartCount = styled.span`
  background: red;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  padding: 2px 6px;
  position: absolute;
  top: 5px;
  right: 10px;
`;

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <HeaderContainer>
        <Logo>
          <Link to="/">Arc Precision</Link>
        </Logo>

        <NavWrapper>
          <Nav>
            <NavList>
              <NavItem><NavLink to="/products">Products</NavLink></NavItem>
              <NavItem><NavLink to="/about">About</NavLink></NavItem>
              <NavItem><NavLink to="/contact">Contact</NavLink></NavItem>
            </NavList>
          </Nav>

          <CTAButton onClick={() => setIsCartOpen(true)}>
            Cart
            {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
          </CTAButton>
        </NavWrapper>
      </HeaderContainer>
      
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
