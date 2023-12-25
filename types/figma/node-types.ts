import { Node } from './global-properties';
import {
  Color,
  ComponentPropertyDefinition,
  Paint,
  TypeStyle,
} from './property-types';
import { Rectangle } from './property-types';

type ComponentPropertyText = {
  value: string;
  type: 'TEXT';
};

type ComponentPropertyBoolean = {
  value: boolean;
  type: 'BOOLEAN';
};

type ComponentProperty = ComponentPropertyText | ComponentPropertyBoolean;

type Document = Node & {
  type: 'DOCUMENT';
  children: Canvas[];
};

type Canvas = Node & {
  type: 'CANVAS';
  children: Node[];
  backgroundColor: Color;
};

type FrameProperties = Node & {
  children: Node[];
  fills: Paint[];
  strokes: Paint[];
  strokeWeight: number;
  strokeAlign: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  strokeDashes: number[];
  cornerRadius: number;
  rectangleCornerRadii: number[];
  opacity: number;
  absoluteBoundingBox: Rectangle;
  minWidth: number | null;
  maxWidth: number | null;
  minHeight: number | null;
  maxHeight: number | null;
  layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  layoutSizingHorizontal: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical: 'FIXED' | 'HUG' | 'FILL';
  primaryAxisAlignItems: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  counterAxisAlignItems: 'MIN' | 'CENTER' | 'MAX' | 'BASELINE';
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  itemSpacing: number;
};

type Frame = FrameProperties & {
  type: 'FRAME';
};

type VectorProperties = Node & {
  opacity: number;
  fills: Paint[];
  strokes: Paint[];
};

type Vector = VectorProperties & {
  type: 'VECTOR';
};

type RectangleNode = VectorProperties & {
  type: 'RECTANGLE';
  cornerRadius: number;
  rectangleCornerRadii: number[];
};

type Text = Node & {
  type: 'TEXT';
  characters: string;
  style: TypeStyle;
};

type Component = FrameProperties & {
  type: 'COMPONENT';
  componentPropertyDefinitions: Map<string, ComponentPropertyDefinition>;
};

type Instance = Frame & {
  componentId: string;
  componentProperties: Map<string, ComponentProperty>;
};

export {
  Canvas,
  Component,
  Document,
  Frame,
  Instance,
  Text,
  Vector,
  RectangleNode,
};
