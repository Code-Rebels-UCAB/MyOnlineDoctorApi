import { JwtService } from "@nestjs/jwt";
import { DoctorORM } from "../../doctor/infraestructura/persistencia/Doctor.orm";
import { RepositorioDoctor } from "../../doctor/infraestructura/adaptadores/RepositorioDoctor";
import { Data } from "../../commun/infraestructura/database/database.service"

jest.mock("../../doctor/infraestructura/adaptadores/RepositorioDoctor");



export class DoctorRepoMockFactory {

   static Crear(){
    return new RepositorioDoctor( Data.getRepository(DoctorORM), new JwtService());
   }

}