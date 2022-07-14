import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './commun/infraestructura/config/config.module';
import { ConfigService } from './commun/infraestructura/config/config.service';
import { DatabaseModule } from './commun/infraestructura/database/database.module';
import { DoctorModule } from './doctor/doctor.module';


@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    DoctorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get('PORT');
  }
}