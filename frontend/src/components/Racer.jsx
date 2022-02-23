import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';


const Racer = props => {

  const { children, position, variant, color, animation, voltage, current, powerUsed, racerId } = props;
  console.log("racer: ", racerId, "powerUsed (kWh):", powerUsed)
  return (
    <Container className='my-1'>

      <Row>
        <Col md={1}>{racerId}</Col>
        <Col md={9}>
          <ProgressBar animated={animation} className={color} now={position || 0} label={`${position ? Math.round(position * 10) / 10 : 0}`} max={100} />
        </Col>
        <Col md={2}>{Math.round(powerUsed * 10000) / 10000}</Col>
      </Row>

    </Container>
  );
}

export default Racer;