import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FigmaExtractorModule } from './figma-extractor/figma-extractor.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), FigmaExtractorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
