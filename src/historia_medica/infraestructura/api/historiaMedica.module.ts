import { DynamicModule} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrearHistoriaMedica } from 'src/historia_medica/aplicacion/servicios/CrearHistoriaMedica.service';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { RepositorioHistoriaMedica } from '../adaptadores/RepositorioHistoriaMedica';
import { HistoriaMedicaORM } from '../persistencia/HistoriaMedica.orm';


export class HistoriaMedicaModule {
  static register(): DynamicModule {
    return {
      module: HistoriaMedicaModule,
      imports: [
        TypeOrmModule.forFeature([HistoriaMedicaORM]),
        LoggerModule,
      ],
      providers: [
        LoggerService,
        RepositorioHistoriaMedica,
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

