import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitaModule } from './cita/infraestructura/api/cita.module';
import { CitaORM } from './cita/infraestructura/persistencia/Cita.orm';
import { ConfigModule } from './commun/infraestructura/config/config.module';
import { ConfigService } from './commun/infraestructura/config/config.service';
import { DatabaseModule } from './commun/infraestructura/database/database.module';
import { DoctorModule } from './doctor/infraestructura/api/doctor.module';
import { DoctorORM } from './doctor/infraestructura/persistencia/Doctor.orm';
import { EspecialidadORM } from './doctor/infraestructura/persistencia/Especialidad.orm';
import { HistoriaMedicaORM } from './historia_medica/infraestructura/persistencia/HistoriaMedica.orm';
import { PacienteORM } from './paciente/infraestructura/persistencia/Paciente.orm';
import { RegistroMedicoORM } from './registro_medico/infraestructura/persistencia/RegistroMedico.orm';



@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorORM, EspecialidadORM, PacienteORM, CitaORM, RegistroMedicoORM, HistoriaMedicaORM]),
    DatabaseModule,
    ConfigModule,
    DoctorModule.register(),
    CitaModule.register(),
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