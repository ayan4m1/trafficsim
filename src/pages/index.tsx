import { Layer, Stage } from 'react-konva';
import { Helmet } from 'react-helmet';
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { Col, Container, Row } from 'react-bootstrap';

import RoadLayout from '../components/RoadLayout';
import VehicleImage from '../components/VehicleImage';
import { Direction, RoadConfiguration, Size, Vehicle } from '../utils';

export default function IndexPage() {
  const animateRef = useRef<number>(0);
  const windowSize = useWindowSize();
  const canvasSize = useMemo<Size>(
    () => ({
      width: windowSize.width - 200,
      height: windowSize.height - 100
    }),
    [windowSize]
  );
  const [configuration] = useState<RoadConfiguration>({
    sections: [
      { direction: Direction.East, lanes: 2, length: 300 },
      {
        direction: Direction.East,
        lanes: 2,
        turnAngle: 90,
        turnDirection: Direction.South,
        length: 200
      }
    ]
  });
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      color: '#ff0000',
      position: { x: 0, y: 0 },
      angle: 0
    }
  ]);
  const handleAnimate = useCallback(() => {
    setVehicles((vehicles) => {
      const result = vehicles.map((vehicle) => ({
        ...vehicle,
        position: {
          x: Math.min(300, vehicle.position.x + 2),
          y: vehicle.position.y
        }
      }));

      //if (vehicles.find((vehicle) => vehicle.position.y === ))

      return result;
    });

    animateRef.current = window.requestAnimationFrame(handleAnimate);
  }, []);

  useEffect(() => {
    animateRef.current = window.requestAnimationFrame(handleAnimate);

    return () => cancelAnimationFrame(animateRef.current);
  }, [handleAnimate]);

  return (
    <Fragment>
      <Helmet title="Traffic Simulator" />
      <Container>
        <Row>
          <Col>
            <Stage width={canvasSize.width} height={canvasSize.height}>
              <RoadLayout configuration={configuration} />
              <Layer>
                {vehicles.map((vehicle) => (
                  <VehicleImage key={vehicle.id} vehicle={vehicle} />
                ))}
              </Layer>
            </Stage>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
