import { RegistroMedicoORM } from "src/registro_medico/infraestructura/persistencia/RegistroMedico.orm";

export interface CitaPersistenciaDTO{

    id_cita: string;
    statuscita: string;
    modalidad: string;
    motivo: string;
    fechacita: Date;
    horacita: Date;
    duracion: number;
    doctor: {
        id_doctor: string,
    };
    paciente: {
        id_paciente: string,
    };
    registroMedico?: RegistroMedicoORM[];
}
