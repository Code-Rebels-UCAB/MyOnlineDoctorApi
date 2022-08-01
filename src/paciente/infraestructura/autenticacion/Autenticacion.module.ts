import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "../../../commun/infraestructura/config/config.module";
import { ConfigService } from "../../../commun/infraestructura/config/config.service";
import { IEncriptarContrasena } from "../../../paciente/aplicacion/puertos/IEncriptarContraseña";
import { IRepositorioPaciente } from "../../../paciente/aplicacion/puertos/IRepositorioPaciente";
import { EncriptarContrasena } from "../adaptadores/EncriptarContraseña";
import { RepositorioPaciente } from "../adaptadores/RepositorioPaciente";
import { PacienteORM } from "../persistencia/Paciente.orm";
import { AutenticacionController } from "./autenticacion.controller";
import { ServicioAutenticacion } from "./autenticacion.service";
import { PacienteEstrategia } from "./estrategias/paciente.estrategia";


@Module({
    imports: [
        ConfigModule,
        PassportModule,
        TypeOrmModule.forFeature([PacienteORM]), 
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
              secret: config.get('SECRET'),
              signOptions: {
                expiresIn: 3600,
              },
            }),
          }),
    ],
    controllers: [AutenticacionController],
    providers: [
      {
        provide: IRepositorioPaciente,
        useClass: RepositorioPaciente,
      }, 
      ServicioAutenticacion, 
      PacienteEstrategia,
      {
      provide: IEncriptarContrasena,
      useClass: EncriptarContrasena,
      }],
    exports: [
        PacienteEstrategia,
        PassportModule,
    ]

})

export class AutenticacionModule {

}