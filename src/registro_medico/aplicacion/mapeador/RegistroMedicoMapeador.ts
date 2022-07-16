import { Guid } from "guid-typescript";
import { Imapeador } from "src/commun/aplicacion/Imapeador";
import { CitaID } from "src/commun/dominio/values/CitaID";
import { DoctorID } from "src/commun/dominio/values/DoctorID";
import { RegistroMedicoID } from "src/commun/dominio/values/RegistroMedicoID";
import { DatosRegistroMedicoVO } from "src/registro_medico/dominio/dto/DatosRegistroMedicoVO";
import { Diagnostico } from "src/registro_medico/dominio/values/Diagnostico";
import { Examenes } from "src/registro_medico/dominio/values/Examenes";
import { Historia } from "src/registro_medico/dominio/values/Historia";
import { Plan } from "src/registro_medico/dominio/values/Plan";
import { Prescripcion } from "src/registro_medico/dominio/values/Prescripcion";
import { RegistroMedicoDataDTO } from "../dto/RegistroMedicoDataDTO";


export class RegistroMedicoMapeador  implements Imapeador<DatosRegistroMedicoVO, RegistroMedicoDataDTO>{

    constructor(){}
    convertirDominioEnPersistencia(entrada: DatosRegistroMedicoVO): RegistroMedicoDataDTO {
        return {
            idRegistroMedico: entrada.idRegistroMedico.getRegistroMedicoID().toString(),
            idCita: entrada.idCita.getCitaID().toString(),
            idDoctor: entrada.idDoctor.getDoctorID().toString(),
            examenes: entrada.examenes.getExamenes(),
            plan: entrada.plan.getPlan(),
            diagnostico: entrada.diagnostico.getDiagnostico(),
            prescripcion: entrada.prescripcion.getPrescripcion(),
            historia: entrada.historia.getHistoria(),
        }
    }
    
    convertirPersistenciaEnDominio(entrada: RegistroMedicoDataDTO): DatosRegistroMedicoVO {
        return {
          idRegistroMedico: RegistroMedicoID.crear(Guid.parse(entrada.idRegistroMedico)),
          idCita: CitaID.crear(Guid.parse(entrada.idCita)),
          idDoctor: DoctorID.crear(Guid.parse(entrada.idDoctor)),
          examenes: Examenes.crear(entrada.examenes),
          historia: Historia.crear(entrada.historia),
          prescripcion: Prescripcion.crear(entrada.prescripcion),
          plan: Plan.crear(entrada.plan),
          diagnostico: Diagnostico.crear(entrada.diagnostico),
        };
    }

    
}
