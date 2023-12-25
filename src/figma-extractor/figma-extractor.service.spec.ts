import { Test, TestingModule } from '@nestjs/testing';
import { FigmaExtractorService } from './figma-extractor.service';

describe('FigmaExtractorService', () => {
  let service: FigmaExtractorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FigmaExtractorService],
    }).compile();

    service = module.get<FigmaExtractorService>(FigmaExtractorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
