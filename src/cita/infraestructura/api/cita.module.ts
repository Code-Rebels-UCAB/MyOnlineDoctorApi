import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasDoctor } from '../../aplicacion/servicios/CitasDoctor.service';
import { CitasSolicitadasDoctor } from '../../aplicacion/servicios/CitasSolicitadasDoctor.service';
import { CantidadPacientesDoctor } from '../../aplicacion/servicios/CantidadPacientesDoctor.service';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { RepositorioCita } from '../adaptadores/RepositorioCita';
import { CitaORM } from '../persistencia/Cita.orm';
import { CitaController} from './cita.controller';
import { AgendarCita } from '../../aplicacion/servicios/AgendarCita.service';
import { BuscarCitasPaciente } from '../../aplicacion/servicios/BuscarCitasPaciente.service';
import { CantidadCitasDiaDoctor } from '../../aplicacion/servicios/CantidadCitasDiaDoctor.service';
import { VideollamadaCita } from '../adaptadores/VideollamadaCita';
import { GenerarTokenCita } from 'src/cita/aplicacion/servicios/GenerarTokenCita.service';

@Module({
  imports: [TypeOrmModule.forFeature([CitaORM]), LoggerModule],
  controllers: [CitaController],
  providers: [CitasSolicitadasDoctor, CitasDoctor, AgendarCita, RepositorioCita, LoggerService, VideollamadaCita, GenerarTokenCita],
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
          provide: CitasDoctor,
          useFactory: (logger: LoggerService, userRepo: RepositorioCita) =>
            new CitasDoctor(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioCita],
          provide: BuscarCitasPaciente,
          useFactory: (logger: LoggerService, userRepo: RepositorioCita) =>
            new BuscarCitasPaciente(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioCita],
          provide: CantidadPacientesDoctor,
          useFactory: (logger: LoggerService, userRepo: RepositorioCita) =>
            new CantidadPacientesDoctor(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioCita],
          provide: CantidadCitasDiaDoctor,
          useFactory: (logger: LoggerService, userRepo: RepositorioCita) =>
            new CantidadCitasDiaDoctor(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioCita],
          provide: AgendarCita,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioCita,
          ) => new AgendarCita(logger, userRepo),
        },
        {
          inject: [LoggerService, VideollamadaCita, RepositorioCita],
          provide: GenerarTokenCita,
          useFactory: (logger: LoggerService, videollamadaCita: VideollamadaCita, userRepo: RepositorioCita) =>
            new GenerarTokenCita(logger,videollamadaCita,userRepo),
        },
      ],
    };
  }
}
