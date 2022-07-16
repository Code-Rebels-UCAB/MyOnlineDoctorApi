import { Guid } from "guid-typescript";
import { Imapeador } from "src/commun/aplicacion/Imapeador";
import { CitaID } from "src/commun/dominio/values/CitaID";
import { DoctorID } from "src/commun/dominio/values/DoctorID";
import { RegistroMedico } from "src/registro_medico/dominio/entidades/RegistroMedico";
import { Diagnostico } from "src/registro_medico/dominio/values/Diagnostico";
import { Examenes } from "src/registro_medico/dominio/values/Examenes";
import { Historia } from "src/registro_medico/dominio/values/Historia";
import { Plan } from "src/registro_medico/dominio/values/Plan";
import { Prescripcion } from "src/registro_medico/dominio/values/Prescripcion";
import { RegistroMedicoPersistenciaDTO } from "../puertos/IRepositoryRegistroMedico";

export class RegistroMedicoMapeador  implements Imapeador<RegistroMedico,RegistroMedicoPersistenciaDTO>{

    
    convertirDominioEnPersistencia(entrada: RegistroMedico): RegistroMedicoPersistenciaDTO {
        return {
            idRegistroMedico: entrada.obtenerIdentificador().getRegistroMedicoID().toString(),
            idCita: entrada.getCitaID().getCitaID().toString(),
            idDoctor: entrada.getDoctorID().getDoctorID().toString(),
            examenes: entrada.getExamenes().getExamenes(),
            plan: entrada.getPlan().getPlan(),
            diagnostico: entrada.getDiagnostico().getDiagnostico(),
            prescripcion: entrada.getPrescripccion().getPrescripcion(),
            historia: entrada.getHistoria().getHistoria()
        }
    }
    
    convertirPersistenciaEnDominio(entrada: RegistroMedicoPersistenciaDTO): RegistroMedico {
        return RegistroMedico.crearRegistroMedico(
          Examenes.crear(entrada.examenes),
          Historia.crear(entrada.historia),
          Prescripcion.crear(entrada.prescripcion),
          Plan.crear(entrada.plan),
          Diagnostico.crear(entrada.diagnostico),
          DoctorID.crear(Guid.parse(entrada.idDoctor)),
          CitaID.crear(Guid.parse(entrada.idCita)),
        );
    }

    
}
