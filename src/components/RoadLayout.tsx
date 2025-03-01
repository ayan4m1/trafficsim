import { useMemo } from 'react';

import { Direction, RoadConfiguration, RoadSectionProps } from '../utils';
import StraightRoad from './StraightRoad';
import CurvedRoad from './CurvedRoad';

interface IProps {
  configuration: RoadConfiguration;
}

export default function RoadLayout({ configuration }: IProps) {
  const sectionProps = useMemo<RoadSectionProps[]>(() => {
    const result: RoadSectionProps[] = [];
    let currentX = 0,
      currentY = 0;

    for (const section of configuration.sections) {
      result.push({
        x: currentX,
        y: currentY,
        section
      });

      switch (section.direction) {
        case Direction.North:
          currentY -= section.length;
          break;
        case Direction.East:
          currentX += section.length;
          break;
        case Direction.South:
          currentY += section.length;
          break;
        case Direction.West:
          currentX -= section.length;
          break;
      }
    }

    return result;
  }, [configuration]);

  return sectionProps.map((props, index) =>
    props.section.turnDirection ? (
      <CurvedRoad key={index} {...props} />
    ) : (
      <StraightRoad key={index} {...props} />
    )
  );
}
