import { DoctorID } from "src/commun/dominio/values/DoctorID"
import { Calificacion } from "../values/Calificacion"
import { CorreoDoctor } from "../values/CorreoDoctor"
import { Especialidad } from "../values/Especialidad"
import { FotoDoctor } from "../values/FotoDoctor"
import { GeneroDoctor } from "../values/GeneroDoctor"
import { NombreCompletoDoctor } from "../values/NombreCompletoDoctor"
import { PasswordDoctor } from "../values/PasswordDoctor"
import { StatusDoctor } from "../values/StatusDoctor"
import { Ubicacion } from "../values/Ubicacion"

export interface DatosObtenerDoctor {
    doctorid: DoctorID,
    nombreDoctor: NombreCompletoDoctor,
    generoDoctor: GeneroDoctor,
    correoDoctor: CorreoDoctor,
    passwordDoctor: PasswordDoctor,
    calificacion: Calificacion,
    ubicacion: Ubicacion,
    fotoDoctor: FotoDoctor,
    statusDoctor: StatusDoctor,
    especialidades: Especialidad[]

}


export interface DatosObtenerEspecialidades{
    especialidad: Especialidad;
}