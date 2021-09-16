import React from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';


function STEMtellCarousel() {
   return (
      <Card className="Carousel" style={{width: "90%"}}>
         <Carousel fade>
            <Carousel.Item>
               <a href="https://i.imgur.com/97dPbql.png" target="_blank" rel="noopener noreferrer">
                  <img
                     className="d-block w-100"
                     src="https://i.imgur.com/97dPbql.png"
                     alt="Homepage"
                  />
               </a>
               <Carousel.Caption id="Homepage">
                  <h3>Homepage</h3>
                  <p>A list of all STEMtells available to a student (only shows STEMtells from classes they are in)</p>
               </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
               <a href="https://i.imgur.com/EyxiXUJ.png" target="_blank" rel="noopener noreferrer">
                  <img
                     className="d-block w-100"
                     src="https://i.imgur.com/EyxiXUJ.png"
                     alt="Profile Page"
                  />
               </a>
               <Carousel.Caption id="Profile Page">
                  <h3>Profile Page</h3>
                  <p>Shows a user profile and their STEMtells</p>
               </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
               <a href="https://i.imgur.com/JBBAnCd.png" target="_blank" rel="noopener noreferrer">
                  <img
                     className="d-block w-100"
                     src="https://i.imgur.com/JBBAnCd.png"
                     alt="Details Page"
                  />
               </a>
               <Carousel.Caption id="STEMtell Details">
                  <h3>STEMtell Details</h3>
                  <p>Shows all info about a STEMtell: Author, Class, Date Uploaded, Image, Description, STEMtags, Reactions, and Comments</p>
               </Carousel.Caption>
            </Carousel.Item>

         </Carousel>

         <Card.Body>
            <Card.Title align="center">STEMtelling</Card.Title>
            <Card.Text>
               STEMtelling is a social media platform for STEM and high school students, with the goal to encourage the exploration of STEM-related fields by creating an enjoyable and interesting place for students to share activities and how they tie into the core of STEM.
               <br />
               <a href="https://github.com/zoofly/STEMtell" target="_blank" rel="noopener noreferrer">View Source Code</a>
               <br />
               <a href="http://stemtelling.tatefeige.com" rel="noopener noreferrer">View Project</a>
            </Card.Text>
         </Card.Body>
      </Card>
   );
};


export default STEMtellCarousel;