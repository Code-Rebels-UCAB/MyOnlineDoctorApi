import { DynamicModule,Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { BuscarDoctorNombreApellido } from '../../aplicacion/servicios/BuscarDoctorNombreApellido';
import { CalificarDoctor } from '../../aplicacion/servicios/CalificarDoctor';
import { LoggerModule } from '../../../commun/infraestructura/logger/logger.module';
import { LoggerService } from '../../../commun/infraestructura/logger/logger.service';
import { BuscarDoctorEspecialidad } from '../../aplicacion/servicios/BuscarDoctorEspecialidad';
import { RepositorioDoctor } from '../adaptadores/RepositorioDoctor';
import { DoctorORM } from '../persistencia/Doctor.orm';
import { DoctorController } from './doctor.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorORM ]),
    LoggerModule,
    
  ],
  controllers: [DoctorController],
  providers: [BuscarDoctorEspecialidad,RepositorioDoctor, LoggerService],
})
export class DoctorModule {
  static register(): DynamicModule {
    return {
      module: DoctorModule,
      providers: [
        {
          inject: [LoggerService, RepositorioDoctor],
          provide: BuscarDoctorEspecialidad,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioDoctor,
          ) => new BuscarDoctorEspecialidad(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioDoctor],
          provide: BuscarDoctorNombreApellido,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioDoctor,
          ) => new BuscarDoctorNombreApellido(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioDoctor],
          provide: CalificarDoctor,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioDoctor,
          ) => new CalificarDoctor(logger, userRepo),
        },        
      ],
    };
  }
}

