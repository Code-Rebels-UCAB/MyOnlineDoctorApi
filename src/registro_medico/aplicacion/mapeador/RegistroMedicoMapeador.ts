
import { Guid } from "guid-typescript";
import { CitaID } from "src/commun/dominio/values/CitaID";
import { DoctorID } from "src/commun/dominio/values/DoctorID";
import { RegistroMedicoID } from "src/commun/dominio/values/RegistroMedicoID";
import { RegistroMedico } from "src/registro_medico/dominio/entidades/RegistroMedico";
import { Diagnostico } from "src/registro_medico/dominio/values/Diagnostico";
import { Examenes } from "src/registro_medico/dominio/values/Examenes";
import { Historia } from "src/registro_medico/dominio/values/Historia";
import { Plan } from "src/registro_medico/dominio/values/Plan";
import { Prescripcion } from "src/registro_medico/dominio/values/Prescripcion";
import { RegistroMedicoRespuestaDTO } from "../../aplicacion/dto/RegistroMedicoRespuestaDTO";
import { CrearRegistroMedicoDTO } from "../dto/CrearRegistroMedicoDTO";

export class RegistroMedicoMapeador {

    static convertirDominioEnPersistencia(entrada: RegistroMedico): RegistroMedicoRespuestaDTO {
        return {
            id_registro: entrada.obtenerIdentificador().toString(),
            id_cita: entrada.getCitaID().toString(),
            examenes: entrada.getExamenes().toString(),
            historia: entrada.getHistoria().toString(),
            prescripcion: entrada.getPrescripccion().toString(),
            plan: entrada.getPlan().toString(),
            diagnostico: entrada.getDiagnostico().toString(),
            id_doctor: entrada.getDoctorID().toString(),
        }
    }
    
    static convertirPersistenciaEnDominio(entrada: CrearRegistroMedicoDTO): RegistroMedico {
        return RegistroMedico.crearRegistroMedico( 
          Examenes.crear(entrada.examenes),
          Historia.crear(entrada.historia),
          Prescripcion.crear(entrada.prescripcion),
          Plan.crear(entrada.plan),
          Diagnostico.crear(entrada.diagnostico),
          DoctorID.crear(Guid.parse(entrada.IdDoctor)),
          CitaID.crear(Guid.parse(entrada.IdCita)),
        );
    }

    
}

