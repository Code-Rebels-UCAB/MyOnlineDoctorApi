import { DynamicModule, Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { BuscarCantidadTodosLosPacientes } from '../../aplicacion/servicios/BuscarCantidadPacientesSistema.service';
import { RepositorioPaciente } from '../adaptadores/RepositorioPaciente';
import { PacienteORM } from '../persistencia/Paciente.orm';
import { GuardarTokenPaciente } from '../../aplicacion/servicios/GuardarTokenPaciente.service';
import { ObtenerInfoPersonalPaciente } from '../../../paciente/aplicacion/servicios/ObtenerInfoPersonalPaciente.service';
import { BuscarPacienteNombre } from '../../../paciente/aplicacion/servicios/BuscarPacienteNombre.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteORM]), LoggerModule],
  controllers: [PacienteController],
  providers: [
    BuscarCantidadTodosLosPacientes,
    BuscarPacienteNombre,
    GuardarTokenPaciente,
    RepositorioPaciente,
    LoggerService,
    ObtenerInfoPersonalPaciente
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
        {
          inject: [LoggerService, RepositorioPaciente],
          provide: BuscarPacienteNombre,
          useFactory: (logger: LoggerService, userRepo: RepositorioPaciente) =>
            new BuscarPacienteNombre(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioPaciente],
          provide: ObtenerInfoPersonalPaciente,
          useFactory: (logger: LoggerService, userRepo: RepositorioPaciente) =>
            new ObtenerInfoPersonalPaciente(logger, userRepo),
        }
      ],
    };
  }
}
