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
import { GenerarTokenCita } from '../../aplicacion/servicios/GenerarTokenCita.service';
import { SolicitarCita } from '../../aplicacion/servicios/SolicitarCita.service';
import { DoctorORM } from '../../../doctor/infraestructura/persistencia/Doctor.orm';
import { PacienteORM } from '../../../paciente/infraestructura/persistencia/Paciente.orm';
import { AceptarCita } from '../../aplicacion/servicios/AceptarCita.service';
import { CancelarCita } from '../../aplicacion/servicios/CancelarCita.service';
import { IniciarCita } from '../../aplicacion/servicios/IniciarCita.service';
import { ManejadorEventos } from '../../../commun/aplicacion/ManejadorEventos';
import { NotificarPacienteFirebase } from '../servicios/NotificarPacienteFirebase';
import { BloquearCita } from '../../aplicacion/servicios/BloquearCita.service';
import { SuspenderCita } from '../../aplicacion/servicios/SuspenderCita.service';
import { FinalizarCita } from '../../aplicacion/servicios/FinalizarCita.service';
import { CitasDiaDoctor } from '../../aplicacion/servicios/CitasDiaDoctor.service';
import { RepositorioDoctor } from 'src/doctor/infraestructura/adaptadores/RepositorioDoctor';


@Module({
  imports: [TypeOrmModule.forFeature([CitaORM, DoctorORM, PacienteORM]), LoggerModule],
  controllers: [CitaController],
  providers: [CitasSolicitadasDoctor, CitasDoctor, AgendarCita, RepositorioCita, LoggerService, SolicitarCita, AceptarCita, CancelarCita, ManejadorEventos ,VideollamadaCita, GenerarTokenCita, IniciarCita, BloquearCita, SuspenderCita, FinalizarCita, RepositorioDoctor],
})
export class CitaModule {
  static register(): DynamicModule {
    //AQUI VA LA DECLARACION DEL PROVIDER "MANEJADOR DE EVENTOS" Y 
    //SE AGREGAN LOS OBSERVADORES QUE DEBEN ESTAR ATENTOS A CAMBIOS EN LOS ESTADOS DEL AGREGADO DE CITA (POLITICAS)
    var manejador = new ManejadorEventos();
    
    

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
          provide: CitasDiaDoctor,
          useFactory: (logger: LoggerService, userRepo: RepositorioCita) =>
            new CitasDiaDoctor(logger, userRepo),
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
            userRepo: RepositorioCita
          ) => new AgendarCita(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioCita],
          provide: SolicitarCita,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioCita,
          ) => new SolicitarCita(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioCita],
          provide: AceptarCita,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioCita,
          ) => new AceptarCita(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioCita],
          provide: CancelarCita,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioCita,
          ) => new CancelarCita(logger, userRepo),
        },
        {
          inject: [LoggerService, VideollamadaCita, RepositorioCita],
          provide: GenerarTokenCita,
          useFactory: (
            logger: LoggerService,
            videollamadaCita: VideollamadaCita, 
            userRepo: RepositorioCita,
          ) => new GenerarTokenCita(logger,videollamadaCita,userRepo),
        },
        {
          inject: [LoggerService, RepositorioCita, GenerarTokenCita, VideollamadaCita, ManejadorEventos],
          provide: IniciarCita,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioCita,
            tokenCita: GenerarTokenCita,
            videollamadaCita: VideollamadaCita
          ) => new IniciarCita(logger,userRepo, new GenerarTokenCita(logger,videollamadaCita,userRepo), manejador),
        },
        {
          inject: [LoggerService, RepositorioCita],
          provide: BloquearCita,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioCita,
          ) => new BloquearCita(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioCita],
          provide: SuspenderCita,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioCita,
          ) => new SuspenderCita(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioCita],
          provide: FinalizarCita,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioCita,
          ) => new FinalizarCita(logger, userRepo),
        },
        {
          inject: [RepositorioCita, RepositorioDoctor],
          provide: NotificarPacienteFirebase,
          useFactory: (
            userRepo: RepositorioCita,
            userRepo2: RepositorioDoctor,
          ) => {manejador.Add(new NotificarPacienteFirebase(userRepo,userRepo2))},
        },
      ],
    }
  }
}


;