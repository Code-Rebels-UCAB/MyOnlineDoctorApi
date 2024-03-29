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
import { HistoriaMedicaModule } from './historia_medica/infraestructura/api/historiaMedica.module';
import { HistoriaMedicaORM } from './historia_medica/infraestructura/persistencia/HistoriaMedica.orm';
import { PacienteModule } from './paciente/infraestructura/api/paciente.module';
import { AutenticacionModule } from './paciente/infraestructura/autenticacion/Autenticacion.module';
import { PacienteORM } from './paciente/infraestructura/persistencia/Paciente.orm';
import { RegistroMedicoModule } from './registro_medico/infraestructura/api/registroMedico.module';
import { RegistroMedicoORM } from './registro_medico/infraestructura/persistencia/RegistroMedico.orm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoctorORM,
      EspecialidadORM,
      PacienteORM,
      CitaORM,
      RegistroMedicoORM,
      HistoriaMedicaORM,
    ]),
    DatabaseModule,
    ConfigModule,
    DoctorModule.register(),
    CitaModule.register(),
    PacienteModule.register(),
    HistoriaMedicaModule.register(),
    RegistroMedicoModule.register(),
    AutenticacionModule,
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
