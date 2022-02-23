import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RacerScoreboard from "./RacerScoreboard";
import RaceScoreboard from "./RaceScoreboard";
import RacesContainer from "./RacesContainer";
import Racer from "./Racer";
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Race = props => {

  const [raceStatus, setRaceStatus] = useState(null);
  const [raceData, setRaceData] = useState({});
  const [raceWinner, setRaceWinner] = useState("");

  const [racerPower, setRacerPower] = useState({});

  const { raceScoreboard, setRaceScoreboard } = props;

  useEffect(() => {
    if (raceStatus) {
      console.log("raceStatus updated", raceStatus)
      axios.get('http://localhost:3001/api/race/' + raceStatus.raceId + '/winner')
        .then(({ data }) => {
          setRaceWinner(data.racer.id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [raceStatus]);


  useEffect(() => {
    // console.log('racer power updated', racerPower)
  }, [racerPower]);


  const getRacers = newRace => {
    axios.get('http://localhost:3001/api/racers')
      .then(({ data }) => {
        if (newRace) newRace(data);
      })
      .catch(err => {
        console.log(err)
      })
  };



  const initializeRace = racers => {

    const source = new EventSource("http://localhost:3001/api/race/start")
    let startTime = 0;
    source.onopen = e => {
      startTime = e.timeStamp;
    };

    console.log("racers", racers)

    let newRacePowerLevels = {};

    source.onmessage = e => {

      const lastEventId = e.lastEventId;
      const messageData = JSON.parse(e.data);
      const raceId = messageData.raceId;
      const racerPosition = messageData.racerPosition;

      const raceData = {
        raceId: raceId,
        lastEventId: lastEventId,
        startTime: startTime,
        source: source,
        racers: racers,
        racerPosition: racerPosition,
        racerPower: racerPower[raceId]
      };

      racerPosition.forEach(racerPositionElement => {
        if (racerPositionElement.position >= 100 && !raceStatus) {
          raceData.source.close();
          setRaceStatus(raceData);
        }
      });

      console.log("raceData", raceData);

      setRaceData(raceData);


      // accumulate power for each racer
      racerPosition.forEach(racerPosData => {
        newRacePowerLevels = {
          ...newRacePowerLevels,
          [racerPosData.racerId]: (newRacePowerLevels[racerPosData.racerId] || 0) + (((racerPosData.voltage * racerPosData.current) / 1000) / 3600),
        }
        setRacerPower(newRacePowerLevels);
      });


    }

    setTimeout(() => {
      source.close();
      console.log("race closed");
    }, 22500);

  }

  useEffect(() => {
    getRacers(initializeRace);
  }, []);


  const handleClick_stopRace = () => {
    raceData.source.close();
    setRaceStatus("stopped");
  };


  return (
    <Card className="my-2" >
      <Card.Body>
        <Card.Title>Race ID: {raceData.raceId || "Loading..."}</Card.Title>
        <Card.Subtitle className="my-2">Update # {raceData.lastEventId || "Loading..."}</Card.Subtitle>
        <Container className='my-1'>
          <Row>
            <Col md={1}><b>Racer</b></Col>
            <Col md={9} />
            <Col md={2}><b>Power used (kWh)</b></Col>
          </Row>
        </Container>
        {
          raceData.racers ? raceData.racers.map(racer => {
            const ext = raceData.racerPosition.filter(racerPositionArrItem => racerPositionArrItem.racerId == racer.id)[0];
            const powerUsed = racerPower[racer.id]
            const extPosition = ext.position;
            const extCurrent = ext.current;
            const extVoltage = ext.voltage;
            return <Racer racerId={racer.id} powerUsed={powerUsed} current={extCurrent} voltage={extVoltage} animation={parseInt(raceData.lastEventId) < 18} key={racer.id} animated color={racer.color} position={extPosition} />
          }) : <h6>Loading...</h6>
        }
        {
          !raceData.racers ? null : parseInt(raceData.lastEventId) < 18 && raceStatus != "stopped" ? (
            // <Button className='mt-3' variant="secondary" onClick={handleClick_stopRace}><i>Stop Race</i></Button>
            <></>
          ) : raceStatus == "stopped" ? <h6 className="mt-3">Race stopped...</h6> : "Race complete.  " + raceWinner + " won the race."
        }
      </Card.Body>
    </Card>
  );
}

export default Race;
