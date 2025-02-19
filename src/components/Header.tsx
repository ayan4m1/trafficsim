import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
  return (
    <Navbar expand="lg" variant="dark">
      <Container fluid="sm">
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">
            <FontAwesomeIcon fixedWidth icon={faCar} size="lg" /> Traffic
            Simulator
          </Nav.Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
