import React from 'react'
import Container from 'react-bootstrap/Container';
import { Navbar, NavDropdown, Nav, Button } from 'react-bootstrap';


function AdminDash() {
  document.body.style.backgroundColor = '#528AAE'
  return(  
    <div>
      <div>
        <Navbar bg="dark" expand="lg" className="ms-auto" style={{borderBottom:"1px"}}>
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavDropdown title={<i className="bi bi-person-circle" style={{color:'white'}}></i>} id="basic-nav-dropdown">
                  <NavDropdown.Item href="http://localhost:3000/Login">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {/* Header, viewing dashboards */}
      <div className="container mb-6 text-center">
        <Container id='clientButtonContainer' fluid style={{width:'35%', paddingTop:'12%'}}>
        <h1 style={{padding:'5%'}}>Admin Permissions</h1>
        <div class="card" className="border border-4 rounded-2" style={{width:'100%', justifyContent:'center', padding:'7%', backgroundColor:'white'}}>
          <div class="card-body">
            <Button class="btn btn-dark" style={{width:'60%',backgroundColor:'grey'}}>Create Professor Account</Button>
          </div>
        </div>
        <div style={{padding:'3%'}}></div>
        <div class="card" className="border border-4 rounded-2" style={{width:'100%', justifyContent:'center', paddingTop:'7%', paddingBottom:'7%', backgroundColor:'white'}}>
          <div class="card-body">
            <Button class="btn btn-dark" style={{width:'50%',backgroundColor:'grey'}}>Create Student Account</Button>
          </div>
        </div>
        </Container>
      </div>
    </div>
  )
}
export default AdminDash;