import { DoctorPersistenciaDTO } from "../../infraestructura/dtos/DoctorPersistenciaDTO";
import { DoctorID } from "../../../commun/dominio/values/DoctorID";
import { DatosDoctorVO, DatosEspecialidadesVO } from "../../dominio/dtos/DatosDoctorVO";
import { Calificacion } from "../../dominio/values/Calificacion";
import { Ubicacion } from "../../dominio/values/Ubicacion";
import { NombreCompletoDoctor } from "../../dominio/values/NombreCompletoDoctor";
import { GeneroDoctor } from "../../dominio/values/GeneroDoctor";
import { CorreoDoctor } from "../../dominio/values/CorreoDoctor";
import { PasswordDoctor } from "../../dominio/values/PasswordDoctor";
import { Latitud } from "../../dominio/values/Latitud";
import { Longitud } from "../../dominio/values/Longitud";
import { FotoDoctor } from "../../dominio/values/FotoDoctor";
import { StatusDoctor } from "../../dominio/values/StatusDoctor";
import { Guid } from "guid-typescript";
import { EspecialidadPersistenciaDTO } from "../../infraestructura/dtos/EspecialidadPersistenciaDTO";
import { Especialidad } from "../../dominio/values/Especialidad";
import { Doctor } from "../../dominio/entidades/Doctor";
import { ListadoDoctoresDTO } from "../dtos/ListadoDoctoresDTO";

export class DoctorMapeador{
    public static covertirPersistenciaDominio(datos: DoctorPersistenciaDTO):Doctor{
        let especialidades: Especialidad[] = []

        if (datos.especialidades.length >0){
            const EspecialidadDominio = datos.especialidades.map((especialidades) =>
            EspecialidadMapeador.covertirPersistenciaDominio(especialidades),
            )


            if (EspecialidadDominio.length > 0){
                EspecialidadDominio.forEach(function(i){
                    especialidades.push(i.especialidad)
                });
            }
        }
        

        return new Doctor(DoctorID.crear(Guid.parse(datos.id_doctor)), NombreCompletoDoctor.crear(datos.p_apellido, datos.p_apellido), GeneroDoctor.crear(datos.sexo as any),
                        CorreoDoctor.crear(datos.correo), PasswordDoctor.crear(datos.password), Calificacion.crear(datos.calificacion), Ubicacion.crear(Latitud.crear(datos.latitud), Longitud.crear(datos.longitud)), FotoDoctor.crear(datos.foto),
                        StatusDoctor.crear(datos.status as any),especialidades );
    }

    public static ConvertirDoctoresEnListado(doctor: Doctor): ListadoDoctoresDTO{

        let especialidadesString: string[] = [];
        if (doctor.getEspecialidad().length > 0){
            doctor.getEspecialidad().forEach(function(i){
                especialidadesString.push(i.getEspecialidad())
            });
        }

        return {
            id_doctor: doctor.obtenerIdentificador().getDoctorID().toString(),
            nombre: doctor.getNombreDoctor().getNombre() +" "+ doctor.getNombreDoctor().getApellido(),
            sexo: doctor.getGeneroDoctor().getGeneroDoctor(),
            correo: doctor.getCorreoDoctor().getCorreoDoctor(),
            especialidades: especialidadesString
        }

        
    }

}

export class EspecialidadMapeador{
    public static covertirPersistenciaDominio(datos:EspecialidadPersistenciaDTO):DatosEspecialidadesVO{
    
        return{
            especialidad: Especialidad.crear(datos.nombre)
        }
    }

}