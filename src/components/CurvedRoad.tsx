import { Arc, Layer, Shape } from 'react-konva';
import { DefaultRoad, Direction, RoadSectionProps } from '../utils';

export default function CurvedRoad({ x, y, section }: RoadSectionProps) {
  return (
    <Layer>
      {Array(section.lanes)
        .fill(0)
        .map((_, index) => (
          <Arc
            key={index}
            x={x}
            y={
              y +
              index * DefaultRoad.width -
              Math.max(0, index * DefaultRoad.width) +
              (section.turnDirection === Direction.South
                ? DefaultRoad.width * section.lanes
                : 0)
            }
            angle={
              section.turnDirection === Direction.South
                ? 360 - section.turnAngle
                : section.turnAngle
            }
            innerRadius={index * DefaultRoad.width}
            outerRadius={(index + 1) * DefaultRoad.width}
            fill={DefaultRoad.color}
            clockwise={section.turnDirection === Direction.South}
          />
        ))}
      {Array(section.lanes - 1)
        .fill(0)
        .map((_, index) => (
          <Shape
            key={index}
            stroke="#fefefe"
            strokeWidth={1}
            dash={[4, 4]}
            sceneFunc={(ctx, shape) => {
              const start = [
                x + index * DefaultRoad.width,
                y + (index + 1) * DefaultRoad.width
              ];
              const dest = [...start];

              if (section.turnDirection === Direction.South) {
                dest[0] += DefaultRoad.width;
                dest[1] += DefaultRoad.width;
              } else {
                dest[0] += DefaultRoad.width;
                dest[1] -= DefaultRoad.width;
              }

              ctx.beginPath();
              ctx.moveTo(start[0], start[1] + 1);
              ctx.quadraticCurveTo(
                dest[0],
                dest[1] + section.turnDirection === Direction.South
                  ? 0
                  : DefaultRoad.width,
                dest[0],
                dest[1]
              );

              ctx.fillStrokeShape(shape);
            }}
          />
        ))}
    </Layer>
  );
}
