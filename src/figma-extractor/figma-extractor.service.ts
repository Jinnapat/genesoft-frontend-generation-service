import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { Document, Frame, Text } from 'types/figma/node-types';
import { Node } from 'types/figma/global-properties';
import { RectangleNode } from 'types/figma/node-types';

@Injectable()
export class FigmaExtractorService {
  constructor(private configService: ConfigService) {}

  // async readFigma(figmaAccessToken: string, figmaFileKey: string) {
  async readFigma() {
    // const readResult = await axios<FigmaRestApiResponse>(
    //   this.configService.get('FIGMA_API_URL') + '/v1/files/' + figmaFileKey,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'X-FIGMA-TOKEN': figmaAccessToken,
    //     },
    //   },
    // );

    // if (readResult.status != 200) {
    //   console.log(readResult.statusText);
    //   throw new InternalServerErrorException();
    // }
    const readString = readFileSync(
      'C:\\Users\\ACER\\Desktop\\genesoft-frontend-generation-service\\example.json',
    ).toString();

    const readResult = JSON.parse(readString);
    return this.extractPages(readResult.document);
  }

  extractPages(documentData: Document) {
    return documentData.children
      .map((page) => {
        if (page.name === '(Templete)') return '';
        const code = `<>${this.createChildren(page.children)}</>`;
        return code;
      })
      .join('');
  }

  createChildren(childrenData: Node[]): string {
    return childrenData.reduce((temp, child) => {
      if (child.name.includes('(button)'))
        return temp + this.createButtonElement(child as Frame);
      if (child.type == 'TEXT' && child.name.includes('(text input)'))
        return temp + this.createInputElement(child as Text, 'text');
      if (child.type == 'TEXT' && child.name.includes('(password input)'))
        return temp + this.createInputElement(child as Text, 'password');
      if (child.type == 'FRAME' || child.type == 'INSTANCE')
        return temp + this.createDivElement(child as Frame);
      if (child.type == 'TEXT')
        return temp + this.createTextElement(child as Text);
      if (child.type == 'TEXT')
        return temp + this.createTextElement(child as Text);
      return temp + '';
    }, '');
  }

  private createFrameFlexClass(frame: Frame): string[] {
    const classes = [];
    if (frame.layoutMode === 'HORIZONTAL') classes.push('flex', 'flex-row');
    if (frame.layoutMode === 'VERTICAL') classes.push('flex', 'flex-col');
    if (frame.primaryAxisAlignItems === 'CENTER')
      classes.push('justify-center');
    if (frame.counterAxisAlignItems === 'CENTER') classes.push('items-center');
    if (frame.itemSpacing > 0) classes.push(`gap-[${frame.itemSpacing}px]`);
    return classes;
  }

  private createFrameDisplayClasses(frame: Frame, isTopNode = false): string[] {
    const classes = [];
    if (frame.cornerRadius > 0)
      classes.push(`rounded-[${frame.cornerRadius}px]`);
    if (frame.fills[0] && frame.fills[0].type === 'SOLID') {
      const stroke = frame.fills[0];
      classes.push(
        `bg-[rgb(${Math.floor(stroke.color.r * 255)},${Math.floor(
          stroke.color.g * 255,
        )},${Math.floor(stroke.color.b * 255)})]`,
      );
    }
    if (frame.paddingLeft > 0) classes.push(`pl-[${frame.paddingLeft}px]`);
    if (frame.paddingRight > 0) classes.push(`pr-[${frame.paddingRight}px]`);
    if (frame.paddingTop > 0) classes.push(`pt-[${frame.paddingTop}px]`);
    if (frame.paddingBottom > 0) classes.push(`pb-[${frame.paddingBottom}px]`);
    if (frame.layoutSizingHorizontal === 'FIXED' && !isTopNode)
      classes.push(`w-[${frame.absoluteBoundingBox.width}px]`);
    if (frame.layoutSizingVertical === 'FIXED' && !isTopNode)
      classes.push(`h-[${frame.absoluteBoundingBox.height}px]`);
    if (frame.layoutSizingHorizontal === 'FILL') classes.push('w-full');
    if (frame.layoutSizingVertical === 'FILL') classes.push('h-full');
    if (frame.maxHeight) classes.push(`max-h-[${frame.maxHeight}px]`);
    if (frame.maxWidth) classes.push(`max-w-[${frame.maxWidth}px]`);
    return classes;
  }

  private createTextDisplayClasses(text: Text): string[] {
    const classes = [];
    if (text.style.textAlignHorizontal === 'CENTER')
      classes.push('text-center');
    if (text.style.textAlignHorizontal === 'RIGHT') classes.push('text-right');
    if (text.style.textAlignHorizontal === 'JUSTIFIED')
      classes.push('text-justify');
    return classes;
  }

  createInputElement(elementData: Text, type: string): string {
    const hintText = elementData.characters;
    const textClassNames = this.createTextDisplayClasses(elementData);
    const classNames = textClassNames;
    if (!hintText)
      return `<input type="${type}" className="${classNames.join(' ')}" />`;
    return `<input placeholder="${hintText}" type="${type}" className="${classNames.join(
      ' ',
    )} bg-transparent outline-none" />`;
  }

  createImageElement(elementData: RectangleNode): string {
    if (elementData.fills[0].type != 'IMAGE') return '';
    const imageLink = elementData.fills[0].imageRef;
    return `<Image src="${imageLink}" alt="image" />`;
  }

  createTextElement(elementData: Text): string {
    const classNames = this.createTextDisplayClasses(elementData);
    return `<p className="${classNames.join(' ')}">${
      elementData.characters
    }</p>`;
  }

  createButtonElement(elementData: Frame) {
    const displayClassNames = this.createFrameDisplayClasses(elementData);
    const classNames = displayClassNames;
    return `<button className="${classNames.join(' ')}">${this.createChildren(
      elementData.children,
    )}</button>`;
  }

  createDivElement(elementData: Frame): string {
    if (elementData.children.length == 0) return '';
    const flexClassNames = this.createFrameFlexClass(elementData);
    const displayClassNames = this.createFrameDisplayClasses(elementData);
    const classNames = flexClassNames.concat(displayClassNames);
    return `<div className="${classNames.join(' ')}">${this.createChildren(
      elementData.children,
    )}</div>`;
  }
}
