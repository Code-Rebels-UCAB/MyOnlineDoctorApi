import { DynamicModule} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrearHistoriaMedica } from '../../../historia_medica/aplicacion/servicios/CrearHistoriaMedica.service';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { RepositorioHistoriaMedica } from '../adaptadores/RepositorioHistoriaMedica';
import { HistoriaMedicaORM } from '../persistencia/HistoriaMedica.orm';
import { PacienteORM } from '../../../paciente/infraestructura/persistencia/Paciente.orm';
import { RepositorioPaciente } from '../../../paciente/infraestructura/adaptadores/RepositorioPaciente';


export class HistoriaMedicaModule {
  static register(): DynamicModule {
    return {
      module: HistoriaMedicaModule,
      imports: [
        TypeOrmModule.forFeature([HistoriaMedicaORM, PacienteORM]),
        LoggerModule,
      ],
      providers: [
        LoggerService,
        RepositorioHistoriaMedica,
        RepositorioPaciente,
        {
            inject: [LoggerService, RepositorioHistoriaMedica],
            provide: CrearHistoriaMedica,
            useFactory: (logger: LoggerService, repositorio: RepositorioHistoriaMedica) =>
              new CrearHistoriaMedica(logger, repositorio),
        },
      ],
    };
  }
}

