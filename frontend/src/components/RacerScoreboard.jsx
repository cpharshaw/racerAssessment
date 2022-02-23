import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const RacerScoreboard = props => {

  const { showRacerScoreboard, handleCloseRacerScoreboard, racerScoreboardData } = props;

  const winnersObj = {};

  // Create unique entries for winners in object
  if (racerScoreboardData) racerScoreboardData.forEach(winner => {
    if (!winnersObj[winner.racer.id]) {
      winnersObj[winner.racer.id] = 0
    };
  });

  // tally wins for each racer
  if (racerScoreboardData) Object.keys(winnersObj).forEach(winner => {
    racerScoreboardData.forEach(raceWinner => {
      if (raceWinner.racer.id == winner) {
        winnersObj[winner]++
      };
    });
  });

  // steps to sort tallies...
  const sortedWinners = Object.keys(winnersObj).map(winner => {
    return winner
  }).sort();

  const sortedWinnersObj = {};

  sortedWinners.forEach(sortedWinner => {
    sortedWinnersObj[sortedWinner] = winnersObj[sortedWinner]
  });

  const sortedWinnersArr = Object.entries(sortedWinnersObj);

  return (
    <Modal show={showRacerScoreboard} onHide={handleCloseRacerScoreboard}>
      <Modal.Header closeButton>
        <Modal.Title>Racer Scoreboard</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {racerScoreboardData && racerScoreboardData.length == 0 ? "No race data at this time..." : (
          <ul>
            {sortedWinnersArr.map(winner => {
              return (
                <li key={winner}>{winner[0]}: {winner[1]} {winner[1] == 1 ? "win" : "wins"}</li>
              )
            })}
          </ul>
        )
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseRacerScoreboard}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RacerScoreboard;