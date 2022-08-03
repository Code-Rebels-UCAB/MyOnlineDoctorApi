import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { IRepositorioDoctor } from "src/doctor/aplicacion/puertos/IRepositorioDoctor";
import { Repository } from "typeorm";
import { DoctorORM } from "../../persistencia/Doctor.orm";


const doctor = {
    //datos doctor
}

export class RepositorioDoctor implements IRepositorioDoctor{

    constructor(
        @InjectRepository(DoctorORM)
        private readonly _doctorRepository: Repository<DoctorORM>,
        @Inject(JwtService)
        private readonly jwt: JwtService,
    ) {}

    obtenerDoctorByEspecialidad(especialidad: string) {
        throw new Error("Method not implemented.");
    }
    obtenerDoctorByNombreorApellido(nombre: string) {
        throw new Error("Method not implemented.");
    }
    obtenerTopDoctores() {
        throw new Error("Method not implemented.");
    }
    obtenerDoctorById(id: string) {
       return "AAA"
    }
    obtenerTodosDoctores() {
        throw new Error("Method not implemented.");
    }
    obtenerDatosDoctor(id: string) {
        throw new Error("Method not implemented.");
    }
    obtenerDoctorNoti(id_doctor: string) {
        throw new Error("Method not implemented.");
    }
    bloquearDoctor(id: string) {
        throw new Error("Method not implemented.");
    }
    calificarDoctor(id: string, puntaje: number, cantidad: number) {
        throw new Error("Method not implemented.");
    }
    autenticarDoctor(correo: string, password: string) {
        throw new Error("Method not implemented.");
    }
    
}