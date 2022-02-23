import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


const Header = ({ children }) => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand ><b><i>Momentum Dynamics</i></b> presents... RaceTime!</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;