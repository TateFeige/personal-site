import React from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './STEMtellCarousel.css';


function STEMtellCarousel() {
   return (
      <Card className="Carousel">
         <Carousel fade>
            <Carousel.Item>
               <a href="https://i.imgur.com/sV0ZCk7.png" target="_blank" rel="noopener noreferrer">
                  <img
                     className="d-block w-100"
                     src="https://i.imgur.com/tCwoHcN.png"
                     alt="STEMtelling Cover"
                  />
               </a>
               <Carousel.Caption id="Caption">
                  <h3>WIP</h3>
                  <p>This project is currently a work in progress. Check back later!</p>
               </Carousel.Caption>
            </Carousel.Item>
         </Carousel>

         <Card.Body>
            <Card.Title align="center">STEMtelling</Card.Title>
            <Card.Text>
               STEMtelling is a social media platform for STEM and high school students, with the goal to encourage the exploration of STEM-related fields by creating an enjoyable and interesting place for students to share activities and how they tie into the core of STEM.
               <br />
               {/* <a href="https://github.com/zoofly/STEMtell" target="_blank" rel="noopener noreferrer">View Source Code</a> */}
            </Card.Text>
         </Card.Body>
      </Card>
   );
};

export default STEMtellCarousel;