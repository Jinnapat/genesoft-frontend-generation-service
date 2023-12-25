type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type SolidPaint = {
  type: 'SOLID';
  color: Color;
};

type FillImagePaint = {
  scaleMode: 'FILL';
};

type FitImagePaint = {
  scaleMode: 'FIT';
};

type StrechImagePaint = {
  scaleMode: 'STRETCH';
  imageTransform: Transform;
};

type TileImagePaint = {
  scaleMode: 'TILE';
  scalingFactor: number;
};

type ImagePaint = (
  | FillImagePaint
  | FitImagePaint
  | StrechImagePaint
  | TileImagePaint
) & {
  type: 'IMAGE';
  rotation: number;
  imageRef: string;
};

type Paint = (SolidPaint | ImagePaint) & {
  visible: boolean;
  opacity: number;
};

type Transform = number[][];

type TypeStyle = {
  fontFamily: string;
  italic: boolean;
  fontWeight: number;
  fontSize: number;
  textDecoration: 'NONE' | 'STRIKETHROUGH' | 'UNDERLINE';
  textAlignHorizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'JUSTIFIED';
};

type ComponentPropertyDefinition = {
  type: ComponentPropertyType;
  defaultValue: boolean | string;
};

type ComponentPropertyType = 'BOOLEAN' | 'INSTRANCE_SWAP' | 'TEXT' | 'VARIANT';

export { Color, Rectangle, Paint, TypeStyle, ComponentPropertyDefinition };
