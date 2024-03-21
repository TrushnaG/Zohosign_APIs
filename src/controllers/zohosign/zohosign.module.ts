import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ZohosignService } from './zohosign.service';
import { ZohosignController } from './zohosign.controller';
import { multerOptions } from 'src/config/interceptors/uploadfile';

@Module({
  imports: [
    MulterModule.register(multerOptions),
  ],
  controllers: [ZohosignController],
  providers: [ZohosignService],
})
export class ZohosignModule {}
