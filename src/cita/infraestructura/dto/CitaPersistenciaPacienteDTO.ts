import { RegistroMedicoORM } from "../../../registro_medico/infraestructura/persistencia/RegistroMedico.orm";

export interface CitaPersistenciaPacienteDTO{

    id_cita: string,
    statuscita: string,
    modalidad: string,
    motivo: string,
    fechacita: string,
    horacita: string,
    duracion: number,
    doctor: {
        id_doctor: string,
        p_nombre: string,
        p_apellido: string,
    },
    paciente: {
        id_paciente: string,
    },
    registroMedico?: RegistroMedicoORM[];
}
