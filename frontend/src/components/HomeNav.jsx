import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import "bootstrap-icons/font/bootstrap-icons.css";

function HomeNav() {
  
    return (
    <div>
    <Navbar bg="light" expand="lg" className="ms-auto" style={{borderBottom:"1px"}}>
      <Container>
        <Navbar.Brand>
        <img  alt="bug" height={70} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title={<i className="bi bi-person"></i>} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
   
    )
}

export default HomeNav;