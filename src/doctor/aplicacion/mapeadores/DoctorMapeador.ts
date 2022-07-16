import { DoctorPersistenciaDTO } from "../puertos/IRepositorioDoctor";
import { DoctorID } from "../../../commun/dominio/values/DoctorID";
import { DatosObtenerDoctor } from "../../dominio/servicios/DatosObtenerDoctor";
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

export class DoctorMapeador{
    public static covertirPersistenciaDominio(datos: DoctorPersistenciaDTO):DatosObtenerDoctor{

        return{
            doctorid: DoctorID.crear(Guid.parse(datos.id_doctor)),
            nombreDoctor: NombreCompletoDoctor.crear(datos.p_nombre, datos.p_apellido),
            generoDoctor: GeneroDoctor.crear(datos.sexo as any),
            correoDoctor: CorreoDoctor.crear(datos.correo),
            passwordDoctor: PasswordDoctor.crear(datos.password),
            calificacion: Calificacion.crear(datos.calificacion),
            ubicacion: Ubicacion.crear(Latitud.crear(datos.latitud), Longitud.crear(datos.longitud)),
            fotoDoctor: FotoDoctor.crear(datos.foto),
            statusDoctor: StatusDoctor.crear(datos.status as any),
        }
    }

}