import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function IndexPage() {
  return (
    <Fragment>
      <Helmet title="Traffic Simulator" />
      <Container>
        <Row>
          <Col>
            <FontAwesomeIcon icon={faSpinner} size="3x" spin />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
