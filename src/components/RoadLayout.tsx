import { useMemo } from 'react';

import RoadSection from './RoadSection';
import { Direction, RoadConfiguration, RoadSectionProps } from '../utils';

interface IProps {
  configuration: RoadConfiguration;
}

export default function RoadLayout({ configuration }: IProps) {
  const sections = useMemo<RoadSectionProps[]>(() => {
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

  return sections.map((section, index) => (
    <RoadSection
      key={index}
      section={section.section}
      x={section.x}
      y={section.y}
    />
  ));
}
