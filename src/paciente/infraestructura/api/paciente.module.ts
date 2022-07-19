import { DynamicModule, Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { BuscarCantidadTodosLosPacientes } from '../../aplicacion/servicios/BuscarCantidadPacientesSistema.service';
import { RepositorioPaciente } from '../adaptadores/RepositorioPaciente';
import { PacienteORM } from '../persistencia/Paciente.orm';
import { GuardarTokenPaciente } from '../../aplicacion/servicios/GuardarTokenPaciente.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteORM]), LoggerModule],
  controllers: [PacienteController],
  providers: [
    BuscarCantidadTodosLosPacientes,
    GuardarTokenPaciente,
    RepositorioPaciente,
    LoggerService,
  ],
})
export class PacienteModule {
  static register(): DynamicModule {
    return {
      module: PacienteModule,
      providers: [
        {
          inject: [LoggerService, RepositorioPaciente],
          provide: BuscarCantidadTodosLosPacientes,
          useFactory: (logger: LoggerService, userRepo: RepositorioPaciente) =>
            new BuscarCantidadTodosLosPacientes(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioPaciente],
          provide: GuardarTokenPaciente,
          useFactory: (logger: LoggerService, userRepo: RepositorioPaciente) =>
            new GuardarTokenPaciente(logger, userRepo),
        },
      ],
    };
  }
}
