import { DynamicModule, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { BuscarDoctorEspecialidad } from '../../aplicacion/servicios/BuscarDoctorEspecialidad';
import { RepositorioPaciente } from '../adaptadores/RepositorioPaciente';
import { PacienteORM } from '../persistencia/Paciente.orm';
import { DoctorController } from '';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteORM]), LoggerModule],
  controllers: [PacienteController],
  providers: [BuscarDoctorEspecialidad, RepositorioDoctor, LoggerService],
})
export class DoctorModule {
  static register(): DynamicModule {
    return {
      module: DoctorModule,
      providers: [
        {
          inject: [LoggerService, RepositorioDoctor],
          provide: BuscarDoctorEspecialidad,
          useFactory: (logger: LoggerService, userRepo: RepositorioDoctor) =>
            new BuscarDoctorEspecialidad(logger, userRepo),
        },
      ],
    };
  }
}
