import { Image } from 'react-konva';
import { useEffect, useState } from 'react';

// @ts-expect-error Cause its stupid
import vehicleSvg from '../images/vehicle.svg';
import { HtmlSvgElement, Vehicle } from '../utils';

interface IProps {
  vehicle: Vehicle;
}

export default function VehicleImage({ vehicle }: IProps) {
  const [image, setImage] = useState<HTMLImageElement>(null);

  useEffect(() => {
    // const color = generateRandomColor();
    const elem = document.createElement('svg') as HtmlSvgElement;

    elem.innerHTML = vehicleSvg;
    elem.querySelector('#Body').setAttribute('fill', vehicle.color);
    elem.querySelector('#RearBumper').setAttribute('fill', vehicle.color);
    elem.querySelector('#RearBumper').setAttribute('filter', 'brightness(60%)');
    elem.querySelector('#FrontBumper').setAttribute('fill', vehicle.color);
    elem
      .querySelector('#FrontBumper')
      .setAttribute('filter', 'brightness(60%)');

    const imageElem = document.createElement<'img'>('img');
    const svgText = new XMLSerializer().serializeToString(
      elem.querySelector('svg')
    );
    imageElem.src = `data:image/svg+xml;base64,${btoa(svgText)}`;
    setImage(imageElem);
  }, []);

  return (
    Boolean(image) && (
      <Image
        image={image}
        scale={{ x: 0.05, y: 0.05 }}
        y={vehicle.position.y + 4}
        x={vehicle.position.x}
        rotation={vehicle.angle}
      />
    )
  );
}
