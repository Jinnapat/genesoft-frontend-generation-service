import { Test, TestingModule } from '@nestjs/testing';
import { FigmaExtractorController } from './figma-extractor.controller';

describe('FigmaExtractorController', () => {
  let controller: FigmaExtractorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FigmaExtractorController],
    }).compile();

    controller = module.get<FigmaExtractorController>(FigmaExtractorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
