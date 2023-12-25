import { Controller, Get, Body } from '@nestjs/common';
import { FigmaExtractorService } from './figma-extractor.service';
import { ReadFigmaDto } from './figma-extractor.dto';

@Controller('figma-extractor')
export class FigmaExtractorController {
  constructor(private figmaExtractorService: FigmaExtractorService) {}
  @Get('/read')
  async readFigmaHandler(@Body() readFigmaDto: ReadFigmaDto) {
    return await this.figmaExtractorService
      .readFigma
      // readFigmaDto.figmaAccessToken,
      // readFigmaDto.figmaFileKey,
      ();
  }
}
