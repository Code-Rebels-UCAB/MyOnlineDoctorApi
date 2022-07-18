import { DynamicModule, Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { buscarCantidadTodosLosPacientes } from 'src/paciente/aplicacion/servicios/buscarCantidadPacientesSistema';
import { RepositorioPaciente } from '../adaptadores/RepositorioPaciente';
import { PacienteORM } from '../persistencia/Paciente.orm';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteORM]), LoggerModule],
  controllers: [PacienteController],
  providers: [
    buscarCantidadTodosLosPacientes,
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
          provide: buscarCantidadTodosLosPacientes,
          useFactory: (logger: LoggerService, userRepo: RepositorioPaciente) =>
            new buscarCantidadTodosLosPacientes(logger, userRepo),
        },
      ],
    };
  }
}
