export enum Direction {
  North = 'n',
  South = 's',
  East = 'e',
  West = 'w'
}

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type RoadSectionProps = {
  x: number;
  y: number;
  section: RoadSection;
};

export type RoadSection = {
  length: number;
  lanes: number;
  direction: Direction;
  turnAngle?: number;
  turnDirection?: Direction;
};

export type RoadConfiguration = {
  sections: RoadSection[];
};

export type Vehicle = {
  id: string;
  color: string;
  position: Position;
  angle: number;
};

export type HtmlSvgElement = HTMLElement & SVGElement;

export const DefaultRoad = {
  width: 30,
  color: '#525257'
};

export const generateRandomColor = () =>
  '#' +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
