import { DynamicModule,Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuscarDoctorNombreApellido } from '../../aplicacion/servicios/BuscarDoctorNombreApellido.service';
import { CalificarDoctor } from '../../aplicacion/servicios/CalificarDoctor.service';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { BuscarDoctorEspecialidad } from '../../aplicacion/servicios/BuscarDoctorEspecialidad.service';
import { RepositorioDoctor } from '../adaptadores/RepositorioDoctor';
import { DoctorORM } from '../persistencia/Doctor.orm';
import { DoctorController } from './doctor.controller';
import { BuscarDoctorTop } from '../../../doctor/aplicacion/servicios/BuscarDoctorTop.service';
import { BuscarTodosDoctores } from '../../../doctor/aplicacion/servicios/BuscarTodosDoctores.service';
import { AutenticarDoctor } from '../../aplicacion/servicios/AutenticarDoctor.service';
import { BuscarDatosPerfil } from '../../aplicacion/servicios/BuscarDatosPerfil.service';
import { BloquearDoctor } from '../../aplicacion/servicios/BloquearDoctor.service';
import { BloquearCita } from '../../../cita/aplicacion/servicios/BloquearCita.service';
import { CitasDoctor } from '../../../cita/aplicacion/servicios/CitasDoctor.service';
import { CitaORM } from '../../../cita/infraestructura/persistencia/Cita.orm';
import { RepositorioCita } from '../../../cita/infraestructura/adaptadores/RepositorioCita';
import { PacienteORM } from '../../../paciente/infraestructura/persistencia/Paciente.orm';
import { ManejadorEventos } from '../../../commun/aplicacion/ManejadorEventos';
import { BloquearCitasDoctor } from '../../../cita/aplicacion/servicios/BloquearCitasDoctor.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CitaORM, DoctorORM, PacienteORM]),
    LoggerModule,
  ],
  controllers: [DoctorController],
  providers: [BuscarDoctorEspecialidad,RepositorioDoctor,RepositorioCita, LoggerService, BuscarDoctorNombreApellido, BuscarDoctorTop, CalificarDoctor, BloquearCita,AutenticarDoctor],
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
        {
          inject: [LoggerService, RepositorioDoctor],
          provide: BuscarDoctorNombreApellido,
          useFactory: (logger: LoggerService, userRepo: RepositorioDoctor) =>
            new BuscarDoctorNombreApellido(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioDoctor],
          provide: BuscarDoctorTop,
          useFactory: (logger: LoggerService, userRepo: RepositorioDoctor) =>
            new BuscarDoctorTop(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioDoctor],
          provide: CalificarDoctor,
          useFactory: (logger: LoggerService, userRepo: RepositorioDoctor) =>
            new CalificarDoctor(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioDoctor],
          provide: BuscarTodosDoctores,
          useFactory: (logger: LoggerService, userRepo: RepositorioDoctor) =>
            new BuscarTodosDoctores(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioDoctor],
          provide: BuscarDatosPerfil,
          useFactory: (logger: LoggerService, userRepo: RepositorioDoctor) =>
            new BuscarDatosPerfil(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioDoctor],
          provide: AutenticarDoctor,
          useFactory: (logger: LoggerService, userRepo: RepositorioDoctor) =>
            new AutenticarDoctor(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioDoctor, RepositorioCita],
          provide: BloquearDoctor,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioDoctor,
            citaRepo: RepositorioCita,
          ) => {
            var politica = new BloquearCitasDoctor(new BloquearCita(logger,citaRepo), new CitasDoctor(logger,citaRepo));
            var manejador = new ManejadorEventos<string>();
            manejador.Add(politica);
            return new BloquearDoctor(logger, userRepo, manejador);
          },
        },
      ],
    };
  }
}
