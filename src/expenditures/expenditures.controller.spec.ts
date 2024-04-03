import { Test, TestingModule } from '@nestjs/testing';
import { ExpendituresController } from './expenditures.controller';
import { ExpendituresService } from './expenditures.service';

describe('ExpendituresController', () => {
  let controller: ExpendituresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpendituresController],
      providers: [ExpendituresService],
    }).compile();

    controller = module.get<ExpendituresController>(ExpendituresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
