import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import WCLCarousel from '../WCLCarousel/WCLCarousel';
import STEMtellCarousel from '../STEMtellCarousel/STEMtellCarousel';
import './LandingPage.css'

function LandingPage() {

   return (
      <>
         <Container fluid>
            <Card className="frosted">
               <Card.Body>
                  <Card.Title>About Me</Card.Title>
               </Card.Body>
               <Card className="frosted-lav"></Card>
            </Card>
            <br />
            <Row xs={1} md={2} className="g-4">
               <Col>
                  <WCLCarousel />
               </Col>
               <Col>
                  <  STEMtellCarousel />
               </Col>
            </Row>
         </Container>
      </>
   )
};

export default LandingPage;