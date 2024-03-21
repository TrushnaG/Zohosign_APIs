import { Module } from '@nestjs/common';
import { join } from "path";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import configuration from './config/configuration';
import { ZohosignModule } from './controllers/zohosign/zohosign.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [configuration]
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'uploads')}),
      ZohosignModule],
    controllers: [AppController],
    providers: [AppService],
    exports:[ConfigModule]
})
export class AppModule {}
