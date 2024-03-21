// zohosign.module.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MulterModule } from '@nestjs/platform-express';
import { ZohosignController } from './zohosign.controller';
import { ZohosignService } from './zohosign.service';
import { multerOptions } from '../../../src/config/interceptors/uploadfile';
import { ConfigService } from '@nestjs/config';

describe('ZohosignModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        MulterModule.register(multerOptions),
      ],
      controllers: [ZohosignController],
      providers: [ZohosignService,ConfigService],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have ZohosignController', () => {
    const controller = module.get<ZohosignController>(ZohosignController);
    expect(controller).toBeDefined();
  });

  it('should have ZohosignService', () => {
    const service = module.get<ZohosignService>(ZohosignService);
    expect(service).toBeDefined();
  });
});
