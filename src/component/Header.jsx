import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './Header.css';

export default function AppHeader() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">NuWear</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link as={Link} to="/">HOME</Nav.Link>

            {/* SHOP Dropdown */}
            <NavDropdown title="SHOP" id="shop-dropdown">
              <NavDropdown.Item as={Link} to="/shop/traditional">
                Traditional Wear
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/shop/western">
                Western Wear
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/about">ABOUT</Nav.Link>
            
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/login" className="login-btn">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
