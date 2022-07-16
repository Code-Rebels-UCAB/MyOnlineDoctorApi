import { Imapeador } from "src/commun/aplicacion/Imapeador";
import { RegistroMedicoDataDTO } from "src/registro_medico/aplicacion/dto/RegistroMedicoDataDTO";
import { RegistroMedicoPersistencia } from "../dto/RegistroMedicoPersitencia";

export class RegistroMedicoMapeador implements Imapeador<RegistroMedicoPersistencia, RegistroMedicoDataDTO>{


    convertirEntradaEnSalida(entrada: RegistroMedicoPersistencia): RegistroMedicoDataDTO {
        return {
            idRegistroMedico: entrada.id_registro,
            idCita: entrada.cita,
            idDoctor: entrada.doctor,
            examenes: entrada.examenes,
            plan: entrada.plan,
            diagnostico: entrada.diagnostico,
            prescripcion: entrada.prescripcion,
            historia: entrada.historia,
        }
    }

    convertirSalidaEnEntrada(entrada: RegistroMedicoDataDTO): RegistroMedicoPersistencia {

        return {
            id_registro: entrada.idRegistroMedico,
            examenes: entrada.examenes,
            historia: entrada.historia,
            prescripcion: entrada.prescripcion,
            plan: entrada.plan,
            diagnostico: entrada.diagnostico,
            doctor: entrada.idDoctor,
            cita: entrada.idCita,
        }


    }


}