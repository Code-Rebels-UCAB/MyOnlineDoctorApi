import { DynamicModule, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "src/commun/infraestructura/config/config.module";
import { ConfigService } from "src/commun/infraestructura/config/config.service";
import { RepositorioPaciente } from "../adaptadores/RepositorioPaciente";
import { PacienteModule } from "../api/paciente.module";
import { PacienteORM } from "../persistencia/Paciente.orm";
import { AutenticacionController } from "./autenticacion.controller";
import { ServicioAutenticacion } from "./autenticacion.service";
import { PacienteEstrategia } from "./estrategias/paciente.estrategia";




@Module({
    imports: [
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
    providers: [RepositorioPaciente, ServicioAutenticacion, PacienteEstrategia],
    exports: [
        PacienteEstrategia,
        PassportModule,
    ]

})

export class AutenticacionModule {

}