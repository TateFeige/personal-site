import React from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WCLCarousel.css';


function WCLCarousel() {
   return (
      <Card className="Carousel">
         <Carousel fade>
            <Carousel.Item>
               <a href="https://i.imgur.com/zEBGJOM.png" target="_blank" rel="noopener noreferrer">
                  <img
                     className="d-block w-100"
                     src="https://i.imgur.com/zEBGJOM.png"
                     alt="Main user page"
                  />
               </a>
               <Carousel.Caption id="Caption">
                  <h3>Main User Page</h3>
                  <p>Shows current user, their current saved character (with clickable name), and their favorite reports (also clickable), and option to delete a saved report from favorites.</p>
               </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
               <a href="https://i.imgur.com/2cOm0Cu.png" target="_blank" rel="noopener noreferrer">
                  <img
                     className="d-block w-100"
                     src="https://i.imgur.com/2cOm0Cu.png"
                     alt="Raid Report Page"
                  />
               </a>
               <Carousel.Caption id="Caption">
                  <h3>Report Page</h3>
                  <p>Shows all kills logged in the submitted report, their length, their difficulty (if Mythic+, also show recorded affixes)</p>
               </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
               <a href="https://i.imgur.com/IYd2Nop.png" target="_blank" rel="noopener noreferrer">
               <img
                  className="d-block w-100"
                  src="https://i.imgur.com/IYd2Nop.png"
                  alt="Report Details"
               />
            </a>
               <Carousel.Caption id="Caption">
                     <h3>Report Item Summary</h3>
                     <p>Shows DPS and HPS rankings for all players in report, along with a few other relevant columns relating to each player.</p>
               </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
               <a href="https://i.imgur.com/dOmOvnm.png" target="_blank" rel="noopener noreferrer">
                  <img
                     className="d-block w-100"
                     src="https://i.imgur.com/dOmOvnm.png"
                     alt="Sorted Report Item Summary"
                  />
               </a>
               <Carousel.Caption id="Caption">
                  <h3>Sorted Report Item Summary</h3>
                  <p>Same as previous, but with "Damage" table sorted by DPS (highest -&gt; lowest) and "Healing" table sorted by ilvl% (highest -&gt; lowest)</p>
               </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
               <a href="https://i.imgur.com/g5DWrAp.png" target="_blank" rel="noopener noreferrer">
                  <img
                     className="d-block w-100"
                     src="https://i.imgur.com/g5DWrAp.png"
                     alt="Mythic+ Report Page"
                  />
               </a>
               <Carousel.Caption id="Caption">
                  <h3>Report Page</h3>
                  <p>Report with Mythic+ keystones</p>
               </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
               <a href="https://i.imgur.com/sV0ZCk7.png" target="_blank" rel="noopener noreferrer">
                  <img
                     className="d-block w-100"
                     src="https://i.imgur.com/sV0ZCk7.png"
                     alt="Mythic+ Report Details"
                  />
               </a>
               <Carousel.Caption id="Caption">
                  <h3>Report Item Summary</h3>
                  <p>Same information and functionality as a regular report summary, however player ilvl is instead keystone level.</p>
               </Carousel.Caption>
            </Carousel.Item>
         </Carousel>

         <Card.Body>
            <Card.Title align="center">Warcraftlogs Simplifier</Card.Title>
            <Card.Text>
               Do you love warcraftlogs, but hate all the “important breakdown information”? Are you just looking to see the information you REALLY care about? Then this is the site for you! Simply enter in your report and see the only important things: damage and healing meters. Everything else has been whisked away!
               <br />
               <a href="https://github.com/TateFeige/WarcraftLogs-Simplifier" target="_blank" rel="noopener noreferrer">View Source Code</a>
               <br />
               <a href="http://simple-wcl.tatefeige.com" rel="noopener noreferrer">View Project</a>
            </Card.Text>
         </Card.Body>
      </Card>
   );
};

export default WCLCarousel;