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
import { BuscarPacienteTelefono } from '../../aplicacion/servicios/BuscarPacienteTelefono.service';
import { RegistrarPaciente } from '../../aplicacion/servicios/RegistrarPaciente.service';
import { ManejadorEventos } from '../../../commun/aplicacion/ManejadorEventos';
import { EncriptarContrasena } from '../adaptadores/EncriptarContraseña';
import { BloquearPaciente } from '../../aplicacion/servicios/BloquearPaciente.service';
import { SuspenderPaciente } from '../../aplicacion/servicios/SuspenderPaciente.service';
import { BloquearCita } from '../../../cita/aplicacion/servicios/BloquearCita.service';
import { RepositorioCita } from '../../../cita/infraestructura/adaptadores/RepositorioCita';
import { BuscarCitasPaciente } from '../../../cita/aplicacion/servicios/BuscarCitasPaciente.service';
import { BloquearCitasPaciente } from '../../../cita/aplicacion/servicios/BloquearCitasPaciente.service';
import { CitaORM } from 'src/cita/infraestructura/persistencia/Cita.orm';
import { DoctorORM } from 'src/doctor/infraestructura/persistencia/Doctor.orm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PacienteORM, CitaORM, DoctorORM]),
    LoggerModule,
  ],
  controllers: [PacienteController],
  providers: [
    BuscarCantidadTodosLosPacientes,
    BuscarPacienteNombre,
    GuardarTokenPaciente,
    RepositorioPaciente,
    RepositorioCita,
    LoggerService,
    ObtenerInfoPersonalPaciente,
    RegistrarPaciente,
    ManejadorEventos,
    EncriptarContrasena,
    BloquearPaciente,
    SuspenderPaciente,
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
        },
        {
          inject: [LoggerService, RepositorioPaciente],
          provide: BuscarPacienteTelefono,
          useFactory: (logger: LoggerService, userRepo: RepositorioPaciente) =>
            new BuscarPacienteTelefono(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioPaciente, EncriptarContrasena],
          provide: RegistrarPaciente,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioPaciente,
            encriptarContrasena: EncriptarContrasena,
          ) => {
            let manejador = new ManejadorEventos<any>();
            return new RegistrarPaciente(
              logger,
              userRepo,
              encriptarContrasena,
              manejador,
            );
          },
        },
        {
          inject: [LoggerService, RepositorioPaciente, RepositorioCita],
          provide: BloquearPaciente,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioPaciente,
            citaRepo: RepositorioCita,
          ) => {
            const politica = new BloquearCitasPaciente(
              new BloquearCita(logger, citaRepo),
              new BuscarCitasPaciente(logger, citaRepo),
            );
            const manager = new ManejadorEventos<string>();
            manager.Add(politica);
            return new BloquearPaciente(logger, userRepo, manager);
          },
        },
        {
          inject: [LoggerService, RepositorioPaciente, RepositorioCita],
          provide: SuspenderPaciente,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioPaciente,
            citaRepo: RepositorioCita,
          ) => {
            const politica = new BloquearCitasPaciente(
              new BloquearCita(logger, citaRepo),
              new BuscarCitasPaciente(logger, citaRepo),
            );
            const manager = new ManejadorEventos<string>();
            manager.Add(politica);
            return new SuspenderPaciente(logger, userRepo, manager);
          },
        },
      ],
    };
  }
}
