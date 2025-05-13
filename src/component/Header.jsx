import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import './Header.css';

export default function AppHeader() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">NuWear</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">HOME</Nav.Link>

            {/* SHOP Dropdown */}
            <NavDropdown title="SHOP" id="shop-dropdown">
              <NavDropdown.Item as={Link} to="/shop/tops">Tops</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/shop/bottoms">Bottoms</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/shop/kurti">Kurti</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/shop/sarees">Sarees</NavDropdown.Item> 
              <NavDropdown.Item as={Link} to="/shop/ethnic-set">Ethnic Set</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/shop/dresses">Dresses</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/about">ABOUT</Nav.Link>
          </Nav>

          {/* Profile + Cart Icons Row */}
          <div className="nav-icons">
            {/* Profile Dropdown */}
            <NavDropdown 
              title={
                <div className="icon-row">
                  <FaUserCircle size={20} />
                  <span className="label-text">Profile</span>
                </div>
              }
              id="profile-dropdown"
              className="profile-dropdown"
            >
              <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/orders">Orders</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/wishlist">Wishlist</NavDropdown.Item>
            </NavDropdown>

            {/* Cart Icon */}
            <Nav.Link as={Link} to="/cart" className="cart-icon">
              <div className="icon-row">
                <FaShoppingCart size={20} />
                <span className="label-text">Cart</span>
              </div>
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
