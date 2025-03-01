import { Arc, Layer, Shape } from 'react-konva';
import { DefaultRoad, RoadSectionProps } from '../utils';

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
              Math.max(0, index * DefaultRoad.width)
            }
            angle={section.turnAngle}
            innerRadius={index * DefaultRoad.width}
            outerRadius={(index + 1) * DefaultRoad.width}
            fill={DefaultRoad.color}
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

              dest[0] += DefaultRoad.width;
              dest[1] -= DefaultRoad.width;

              ctx.beginPath();
              ctx.moveTo(start[0], start[1] + 1);
              ctx.quadraticCurveTo(
                dest[0],
                dest[1] + DefaultRoad.width,
                dest[0],
                dest[1]
              );

              ctx.fillStrokeShape(shape);
            }}
          />
          // <Arc
          //   key={index}
          //   x={x}
          //   y={
          //     y +
          //     index * DefaultRoad.width -
          //     Math.max(0, index * DefaultRoad.width)
          //   }
          //   angle={section.turnAngle}
          //   innerRadius={index * DefaultRoad.width}
          //   outerRadius={(index + 1) * DefaultRoad.width}
          //   stroke="#fefefe"
          //   strokeWidth={1}
          //   dash={[4, 4]}
          // />
        ))}
    </Layer>
  );
}
