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
         <Container fluid className="About">
            <Card className="frosted">
               <Card.Body>
                  <Card.Title className="AboutMe">About Me</Card.Title>
               </Card.Body>
               <Card className="frosted-lav">
                  <Card.Body>
                     <Card.Text>
                        I love to code! This website is a work in progress, but take a look at my GitHub or a couple of my projects if you'd like.
                     </Card.Text>
                  </Card.Body>
               </Card>
            </Card>
         </Container>
         <br />
         <Container fluid className="Carousel-Container">
         <Card className="Projects-Header-Frosted-Lav" align="center">
               <Card.Title className="MyProjects">My Projects</Card.Title>
            </Card>
            <Row xs={1} md={2} className="g-4">
               <Col>
                  <WCLCarousel />
               </Col>
               <Col>
                  <STEMtellCarousel />
               </Col>
            </Row>
         </Container>
      </>
   )
};

export default LandingPage;