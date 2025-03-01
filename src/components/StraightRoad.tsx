import { Layer, Line, Rect } from 'react-konva';
import { DefaultRoad, Direction, RoadSectionProps } from '../utils';

export default function StraightRoad({ x, y, section }: RoadSectionProps) {
  return (
    <Layer>
      {Array(section.lanes)
        .fill(0)
        .map((_, index) =>
          [Direction.West, Direction.East].includes(section.direction) ? (
            <Rect
              key={index}
              x={x}
              y={y + index * DefaultRoad.width}
              height={DefaultRoad.width}
              width={section.length}
              fill={DefaultRoad.color}
            />
          ) : (
            <Rect
              key={index}
              x={x + index * DefaultRoad.width}
              y={y}
              height={section.length}
              width={DefaultRoad.width}
              fill={DefaultRoad.color}
            />
          )
        )}
      {Array(section.lanes - 1)
        .fill(0)
        .map((_, index) =>
          [Direction.West, Direction.East].includes(section.direction) ? (
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
          ) : (
            <Line
              key={index}
              x={x + (index + 1) * DefaultRoad.width + 1}
              y={y}
              points={[0, 0, 0, section.length]}
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
