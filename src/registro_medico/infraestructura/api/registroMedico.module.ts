import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrearRegistroMedico } from '../../aplicacion/servicios/CrearRegistroMedico.service';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { RepositorioRegistroMedico } from '../adaptadores/RepositorioRegistroMedico';
import { RegistroMedicoORM } from '../persistencia/RegistroMedico.orm';
import { RegistroMedicoController } from './registroMedico.controller';
import { CrearHistoriaMedica } from '../../../historia_medica/aplicacion/servicios/CrearHistoriaMedica.service';
import { RepositorioHistoriaMedica } from '../../../historia_medica/infraestructura/adaptadores/RepositorioHistoriaMedica';
import { HistoriaMedicaORM } from '../../../historia_medica/infraestructura/persistencia/HistoriaMedica.orm';
import { PacienteORM } from '../../../paciente/infraestructura/persistencia/Paciente.orm';
import { CitaORM } from '../../../cita/infraestructura/persistencia/Cita.orm';
import { DoctorORM } from '../../../doctor/infraestructura/persistencia/Doctor.orm';
import { EditarRegistroMedico } from '../../aplicacion/servicios/EditarRegistroMedico.service';
import { ManejadorEventos } from '../../../commun/aplicacion/ManejadorEventos';
import { RepositorioDoctor } from '../../../doctor/infraestructura/adaptadores/RepositorioDoctor';
import { RepositorioCita } from '../../../cita/infraestructura/adaptadores/RepositorioCita';
import { NotificarRegistroMedicoCreado } from '../servicios/NotificarRegistroCreado';
import { ObtenerRegistrosPaciente } from '../../../registro_medico/aplicacion/servicios/ObtenerRegistrosPaciente.service';
import { JwtService } from '@nestjs/jwt';

export class RegistroMedicoModule {
  static register(): DynamicModule {
    //AQUI VA LA DECLARACION DEL PROVIDER "MANEJADOR DE EVENTOS" Y
    //SE AGREGAN LOS OBSERVADORES QUE DEBEN ESTAR ATENTOS A CAMBIOS EN LOS ESTADOS DEL AGREGADO DE CITA (POLITICAS)
    var manejador = new ManejadorEventos();

    return {
      module: RegistroMedicoModule,
      imports: [
        TypeOrmModule.forFeature([
          RegistroMedicoORM,
          HistoriaMedicaORM,
          PacienteORM,
          CitaORM,
          DoctorORM,
        ]),
        LoggerModule,
      ],
      controllers: [RegistroMedicoController],
      providers: [
        LoggerService,
        RepositorioRegistroMedico,
        RepositorioHistoriaMedica,
        ManejadorEventos,
        RepositorioDoctor,
        RepositorioCita,
        JwtService,
        {
          inject: [
            LoggerService,
            RepositorioRegistroMedico,
            RepositorioHistoriaMedica,
            ManejadorEventos,
          ],
          provide: CrearRegistroMedico,
          useFactory: (
            logger: LoggerService,
            repoRegistro: RepositorioRegistroMedico,
            repoHistoria: RepositorioHistoriaMedica,
          ) => {
            const crearHistoria = new CrearHistoriaMedica(logger, repoHistoria);
            return new CrearRegistroMedico(
              logger,
              repoRegistro,
              crearHistoria,
              manejador,
            );
          },
        },
        {
          inject: [LoggerService, RepositorioRegistroMedico],
          provide: EditarRegistroMedico,
          useFactory: (
            logger: LoggerService,
            repoRegistro: RepositorioRegistroMedico,
          ) => {
            return new EditarRegistroMedico(logger, repoRegistro);
          },
        },
        {
          inject: [
            RepositorioRegistroMedico,
            RepositorioDoctor,
            RepositorioCita,
            LoggerService,
          ],
          provide: EditarRegistroMedico,
          useFactory: (
            repoRegistro: RepositorioRegistroMedico,
            repoDoctor: RepositorioDoctor,
            repoCita: RepositorioCita,
            logger: LoggerService,
          ) => {
            manejador.Add(
              new NotificarRegistroMedicoCreado(
                repoRegistro,
                repoDoctor,
                repoCita,
                logger,
              ),
            );
          },
        },
        {
          inject: [LoggerService, RepositorioRegistroMedico],
          provide: ObtenerRegistrosPaciente,
          useFactory: (
            logger: LoggerService,
            repoRegistro: RepositorioRegistroMedico,
          ) => {
            return new ObtenerRegistrosPaciente(logger, repoRegistro);
          },
        },
      ],
    };
  }
}
