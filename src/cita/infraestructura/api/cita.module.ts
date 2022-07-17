import { DynamicModule,Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasSolicitadasDoctor } from 'src/cita/aplicacion/servicios/CitasSolicitadasDoctor';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { RepositorioCita } from '../adaptadores/RepositorioCita';
import { CitaORM } from '../persistencia/Cita.orm';
import { CitaController} from './cita.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([CitaORM]),
    LoggerModule,
    
  ],
  controllers: [CitaController],
  providers: [CitasSolicitadasDoctor,RepositorioCita, LoggerService],
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
      ],
    };
  }
}

