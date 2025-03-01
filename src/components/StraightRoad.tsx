import { Layer, Line, Rect } from 'react-konva';
import { DefaultRoad, RoadSectionProps } from '../utils';

export default function StraightRoad({ x, y, section }: RoadSectionProps) {
  return (
    <Layer>
      {Array(section.lanes)
        .fill(0)
        .map((_, index) => (
          <Rect
            key={index}
            x={x}
            y={y + index * DefaultRoad.width}
            height={DefaultRoad.width}
            width={section.length}
            fill={DefaultRoad.color}
          />
        ))}
      {Array(section.lanes - 1)
        .fill(0)
        .map((_, index) => (
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
        ))}
    </Layer>
  );
}
