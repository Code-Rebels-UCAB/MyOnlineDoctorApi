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
import { BuscarDatosPerfil } from '../../aplicacion/servicios/BuscarDatosPerfil.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorORM ]),
    LoggerModule,
    
  ],
  controllers: [DoctorController],
  providers: [BuscarDoctorEspecialidad,RepositorioDoctor, LoggerService, BuscarDoctorNombreApellido, BuscarDoctorTop, CalificarDoctor],
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
          provide: BuscarDoctorTop,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioDoctor,
          ) => new BuscarDoctorTop(logger, userRepo),
        },
        {
          inject: [LoggerService, RepositorioDoctor],
          provide: CalificarDoctor,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioDoctor,
          ) => new CalificarDoctor(logger, userRepo),
        },   
        {
          inject: [LoggerService, RepositorioDoctor],
          provide: BuscarTodosDoctores,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioDoctor,
          ) => new BuscarTodosDoctores(logger, userRepo),
        }, 
        {
          inject: [LoggerService, RepositorioDoctor],
          provide: BuscarDatosPerfil,
          useFactory: (
            logger: LoggerService,
            userRepo: RepositorioDoctor,
          ) => new BuscarDatosPerfil(logger, userRepo),
        },          
      ],
    };
  }
}

