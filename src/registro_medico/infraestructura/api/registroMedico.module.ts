import { DynamicModule} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrearRegistroMedico } from '../../aplicacion/servicios/CrearRegistroMedico.service';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { RepositorioRegistroMedico } from '../adaptadores/RepositorioRegistroMedico';
import { RegistroMedicoORM } from '../persistencia/RegistroMedico.orm';
import { RegistroMedicoController } from './registroMedico.controller';
import { CrearHistoriaMedica } from '../../../historia_medica/aplicacion/servicios/CrearHistoriaMedica.service';
import { RepositorioHistoriaMedica } from 'src/historia_medica/infraestructura/adaptadores/RepositorioHistoriaMedica';
import { HistoriaMedicaORM } from '../../../historia_medica/infraestructura/persistencia/HistoriaMedica.orm';


export class RegistroMedicoModule {
  static register(): DynamicModule {
    return {
      module: RegistroMedicoModule,
      imports: [TypeOrmModule.forFeature([RegistroMedicoORM, HistoriaMedicaORM]), LoggerModule],
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
      ],
    };
  }
}

