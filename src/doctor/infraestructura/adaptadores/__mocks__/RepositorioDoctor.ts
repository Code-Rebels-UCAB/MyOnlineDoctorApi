import { IRepositorioDoctor } from "src/doctor/aplicacion/puertos/IRepositorioDoctor";


const doctor = {
    //datos doctor
}

export class RepositorioDoctor implements IRepositorioDoctor{
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
        throw new Error("Method not implemented.");
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