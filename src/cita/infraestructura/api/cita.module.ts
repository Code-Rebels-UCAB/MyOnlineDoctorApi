import { DynamicModule,Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasDoctor } from '../../aplicacion/servicios/CitasDoctor';
import { CitasSolicitadasDoctor } from '../../aplicacion/servicios/CitasSolicitadasDoctor';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { RepositorioCita } from '../adaptadores/RepositorioCita';
import { CitaORM } from '../persistencia/Cita.orm';
import { CitaController} from './cita.controller';
import { AgendarCita } from 'src/cita/aplicacion/servicios/AgendarCita';
import { BuscarCitasPaciente } from '../../aplicacion/servicios/BuscarCitasPaciente';


@Module({
  imports: [
    TypeOrmModule.forFeature([CitaORM]),
    LoggerModule,
    
  ],
  controllers: [CitaController],
  providers: [CitasSolicitadasDoctor, CitasDoctor, AgendarCita, RepositorioCita, LoggerService],
})


export class CitaModule {
  static register(): DynamicModule {
    return {
      module: CitaModule,
      providers: [
        {
          inject: [LoggerService, RepositorioCita],
          provide: CitasSolicitadasDoctor,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioCita,
          ) => new CitasSolicitadasDoctor(logger, userRepo),
        },   
        {
          inject: [LoggerService, RepositorioCita],
          provide: CitasDoctor,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioCita,
          ) => new CitasDoctor(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioCita],
          provide: BuscarCitasPaciente,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioCita,
          ) => new BuscarCitasPaciente(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioCita],
          provide: AgendarCita,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioCita,
          ) => new AgendarCita(logger, userRepo),
        },
      ],
    };
  }
}

