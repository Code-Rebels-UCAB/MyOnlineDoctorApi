import { DynamicModule} from '@nestjs/common';
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



export class RegistroMedicoModule {
  static register(): DynamicModule {
    return {
      module: RegistroMedicoModule,
      imports: [TypeOrmModule.forFeature([RegistroMedicoORM, HistoriaMedicaORM, PacienteORM, CitaORM, DoctorORM]), LoggerModule],
      controllers: [RegistroMedicoController],
      providers: [
        LoggerService,
        RepositorioRegistroMedico,
        RepositorioHistoriaMedica,
        {
          inject: [
            LoggerService,
            RepositorioRegistroMedico,
            RepositorioHistoriaMedica,
          ],
          provide: CrearRegistroMedico,
          useFactory: (
            logger: LoggerService,
            repoRegistro: RepositorioRegistroMedico,
            repoHistoria: RepositorioHistoriaMedica,
          ) => {
            const crearHistoria = new CrearHistoriaMedica(logger,repoHistoria);
            return new CrearRegistroMedico(logger, repoRegistro, crearHistoria);
          },
        },
        {
          inject: [
            LoggerService,
            RepositorioRegistroMedico,
          ],
          provide: EditarRegistroMedico,
          useFactory: (
            logger: LoggerService,
            repoRegistro: RepositorioRegistroMedico,
          ) => {
            return new EditarRegistroMedico(logger, repoRegistro);
          },
        },
      ],
    };
  }
}

