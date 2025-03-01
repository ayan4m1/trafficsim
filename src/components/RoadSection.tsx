import { Arc, Layer, Line, Rect } from 'react-konva';

import {
  DefaultRoad,
  Direction,
  RoadSection,
  RoadSectionProps
} from '../utils';

export default function RoadSection({ section, x, y }: RoadSectionProps) {
  return (
    <Layer>
      {Array(section.lanes)
        .fill(0)
        .map((_, index) =>
          section.turnDirection ? (
            <Arc
              key={index}
              x={x}
              y={
                y +
                index * DefaultRoad.width -
                Math.max(0, index * DefaultRoad.width)
              }
              angle={section.turnAngle}
              innerRadius={index * DefaultRoad.width}
              outerRadius={(index + 1) * DefaultRoad.width}
              fill={DefaultRoad.color}
            />
          ) : (
            <Rect
              key={index}
              x={x}
              y={y + index * DefaultRoad.width}
              height={DefaultRoad.width}
              width={section.length}
              fill={DefaultRoad.color}
            />
          )
        )}
      {Array(section.lanes - 1)
        .fill(0)
        .map((_, index) =>
          section.turnDirection ? (
            <Arc
              key={index}
              x={x}
              y={
                y +
                index * DefaultRoad.width -
                Math.max(0, index * DefaultRoad.width)
              }
              angle={section.turnAngle}
              innerRadius={index * DefaultRoad.width}
              outerRadius={(index + 1) * DefaultRoad.width}
              stroke="#fefefe"
              strokeWidth={1}
              dash={[4, 4]}
            />
          ) : (
            <Line
              key={index}
              x={x}
              y={y + (index + 1) * DefaultRoad.width + 1}
              points={[0, 0, section.length, 0]}
              tension={1}
              stroke="#fefefe"
              strokeWidth={1}
              dash={[4, 4]}
            />
          )
        )}
    </Layer>
  );
}
