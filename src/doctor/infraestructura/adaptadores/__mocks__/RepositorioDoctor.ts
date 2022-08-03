import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { IRepositorioDoctor } from "../../../aplicacion/puertos/IRepositorioDoctor";
import { Repository } from "typeorm";
import { DoctorORM } from "../../persistencia/Doctor.orm";
import { PerfilDoctorDTO } from "../../../aplicacion/dtos/PerfilDoctorDTO";


const Doctores = [
    {
      id_doctor:'0462d106-df70-4f8d-b322-0c736f4069e7',
      p_nombre: 'Aaron',
      p_apellido: 'Glassman',
      sexo:'M',
      foto: 'https://cdn.discordapp.com/attachments/997586747141668876/997603634168737912/unknown.png',
      calificacion: 15,
      cantidad_calificacion: '3',
      correo: 'Aaron72@example.net',
      password: 'Doctor1234',
      status: 'Activo',
      especialidades:[
        'Neumologia',
        'Neurologia',
        'Nutriologia'
      ]
    },
]

export class RepositorioDoctor implements IRepositorioDoctor{

    constructor(
        @InjectRepository(DoctorORM)
        private readonly _doctorRepository: Repository<DoctorORM>,
        @Inject(JwtService)
        private readonly jwt: JwtService,
    ) {}


    async obtenerDatosDoctor(id: string){
        const datos = Doctores.filter( (doctor) => doctor.id_doctor == id);

        return  {
            p_nombre: datos[0].p_nombre,
            p_apellido: datos[0].p_apellido,
            sexo: datos[0].sexo,
            foto: datos[0].foto,
            calificacion: datos[0].calificacion,
            especialidades: datos[0].especialidades,
        }
        
    }

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