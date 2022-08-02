import { RegistroMedicoORM } from "../../../registro_medico/infraestructura/persistencia/RegistroMedico.orm";

export interface DetalleRegistroMedicoPersistenciaDTO {

    id_registro: string,
    examenes: string,
    historia: string,
    prescripcion: string,
    plan: string,
    diagonistico: string,
    motivo: string,
    fechaCita: string,
    doctor: {
        id_doctor: string,
        p_nombre: string,
        p_apellido: string,
        sexo: string,
    },
    cita:{
        id_cita: string,
        modalidad: string,
    }
    historiaMedica: {
        id_historia: string,
        paciente: {
            id_paciente: string,
        }
    }
}
