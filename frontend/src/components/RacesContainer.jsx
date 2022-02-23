import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const RacesContainer = ({ children }) => {

  return (
    <Container>
      {children}
    </Container>
  );
}

export default RacesContainer;