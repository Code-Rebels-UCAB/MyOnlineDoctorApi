import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasSolicitadasDoctor } from '../../aplicacion/servicios/CitasSolicitadasDoctor';
import { CantidadPacientesDoctor } from 'src/cita/aplicacion/servicios/CantidadPacientesDoctor';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { RepositorioCita } from '../adaptadores/RepositorioCita';
import { CitaORM } from '../persistencia/Cita.orm';
import { CitaController } from './cita.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CitaORM]), LoggerModule],
  controllers: [CitaController],
  providers: [
    CitasSolicitadasDoctor,
    CantidadPacientesDoctor,
    RepositorioCita,
    LoggerService,
  ],
})
export class CitaModule {
  static register(): DynamicModule {
    return {
      module: CitaModule,
      providers: [
        {
          inject: [LoggerService, RepositorioCita],
          provide: CitasSolicitadasDoctor,
          useFactory: (logger: LoggerService, userRepo: RepositorioCita) =>
            new CitasSolicitadasDoctor(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioCita],
          provide: CantidadPacientesDoctor,
          useFactory: (logger: LoggerService, userRepo: RepositorioCita) =>
            new CantidadPacientesDoctor(logger, userRepo),
        },
      ],
    };
  }
}
