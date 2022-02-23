import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Header from "./Header";
import Footer from "./Footer";
import RacerScoreboard from "./RacerScoreboard";
import RaceScoreboard from "./RaceScoreboard";
import RacesContainer from "./RacesContainer";
import Racer from "./Racer";
import Race from "./Race";
import { uid } from 'uid';


const Layout = props => {

  const [races, setRaces] = useState([]);
  const [raceScoreboard, setRaceScoreboard] = useState({});
  const [showRacerScoreboard, setShowRacerScoreboard] = useState(false);
  const [racerScoreboardData, setRacerScoreboardData] = useState(null);

  const { children } = props;

  useEffect(() => {
    // console.log("race scoreboard updated", raceScoreboard)
  }, [raceScoreboard]);

  const handleCloseRacerScoreboard = () => {
    console.log("close modal clicked")
    setShowRacerScoreboard(false);
  }

  const handleShowRacerScoreboard = () => {
    console.log("open modal clicked")
    setShowRacerScoreboard(true);
  }

  const handleClick_startARace = () => {
    console.log("Starting race...")
    setRaces(
      [
        <Race raceScoreboard={raceScoreboard} setRaceScoreboard={setRaceScoreboard} key={uid()} />,
        ...races,
      ]
    )
  }

  const handleClick_refreshScoreboard = () => {
    axios.get('http://localhost:3001/api/winners')
      .then(({ data }) => {
        // console.log(data)
        setRacerScoreboardData(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    // if (racerScoreboardData) console.log("racerScoreboardData updated", racerScoreboardData)
    if (racerScoreboardData) handleShowRacerScoreboard()
  }, [racerScoreboardData]); 

  return (
    <Container>
      <Header />
      <br />
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Button className="m-2" onClick={handleClick_startARace} variant="primary">Start a race!</Button>
              </Col>
            </Row>
            <Row>
              <Col>                
                <Button className="m-2" onClick={handleClick_refreshScoreboard} variant="secondary">Show Racer scoreboard</Button>
              </Col>
              {/* <Col></Col> */}
              </Row>
          </Card.Body>
        </Card>
        <br />
        <RacesContainer>
          {races}
        </RacesContainer>
      </Container>
      <RacerScoreboard 
        racerScoreboardData={racerScoreboardData}
        showRacerScoreboard={showRacerScoreboard}
        handleCloseRacerScoreboard={handleCloseRacerScoreboard} 
      />
    </Container>
  );
}

export default Layout;




  // "indigo",
  // "pink",
  // "orange",
  // "purple",
  // "yellow",
  // "blue",
  // "green"
  // "red"


  // const races = {
  //   "1a8ce9e5-217d-420e-9c44-089ba6ca1575": {
  //     source: null,
  //     racers: {
  //       "racer0": {
  //         name: "Racer #0",
  //         color: "indigo",
  //         positionHistory: [],
  //         latestPosition: "x"
  //       },
  //        ...
  //     },
  //   },
  //   "99pizza711-aE-1652-f562-51df5s1f5sf5": {
  //     source: null,
  //     racers: {
  //       "racer0": {
  //         name: "Racer #0",
  //         color: "indigo",
  //         positionHistory: [],
  //         latestPosition: "x"
  //       },
  //        ...
  //     },
  //   }
  //    ...
  // }s