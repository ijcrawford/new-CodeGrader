import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';


function adminDash() {
    
  return(  
    <div>
      <div>
        
      </div>

      {/* Header, viewing dashboards */}
      <div className="container-fluid text-sm-center p-3" style={{fontFamily: 'Bitter'}}>
            
          <h3> Welcome!</h3>
      </div> 
      <div className="col d-flex justify-content-center">
        <Container id='clientButtonContainer' fluid>

          {/* Card1: [Submit a Problem, View Pending Intake, [Approved Intake Name]] */}
          <Card id='card1' className="text-center mx-auto" style={{ background: '#0098C3', width: '60rem', margin:'10px', marginTop: '60px',color:'whitesmoke', fontFamily: 'Bitter' }}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                  <Button  variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}>Create Professor Account</Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card2: Completed Courses */}
          <Card id='card2' className="text-center mx-auto" style={{ background: '#a40084', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
            <Card.Body>
             
              <Button  variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}>Create Student Account</Button>
            </Card.Body>
          </Card> 
        </Container>
      </div>
    </div>

  )
}

export default adminDash;