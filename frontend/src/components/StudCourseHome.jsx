import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import HomeNav from './HomeNav';

function StudCourseHome() {


    
  return(  
    <div>
      <div>
        <HomeNav/>
      </div>

      {/* Jumbotron */}
      <div className="jumbotron" style={{backgroundColor: '#d2492a', color:'whitesmoke'}}>
        <div className="container">
          <div className="row">
            <span className='p-5' style={{display: 'flex', justifyContent: 'center'}}>
              <h1 style={{fontFamily: 'Bitter', verticalAlign: 'middle', borderBottom: '0', margin: '0%'}}>Courses</h1>
              
            </span>
          </div>
        </div>
      </div>
      <div className="col d-flex justify-content-center">
        <Container id='clientButtonContainer' fluid>

          {/* Card1: [Submit a Problem, View Pending Intake, [Approved Intake Name]] */}
          <Card id='card1' className="text-center mx-auto" style={{ background: '#0098C3', width: '60rem', margin:'10px', marginTop: '60px',color:'whitesmoke', fontFamily: 'Bitter' }}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                  <Button  variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}>Course 1</Button>
              </Card.Title>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>

  )
}

export default StudCourseHome;