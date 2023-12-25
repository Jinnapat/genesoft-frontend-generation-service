import { Module } from '@nestjs/common';
import { FigmaExtractorService } from './figma-extractor.service';
import { FigmaExtractorController } from './figma-extractor.controller';

@Module({
  providers: [FigmaExtractorService],
  controllers: [FigmaExtractorController],
})
export class FigmaExtractorModule {}
