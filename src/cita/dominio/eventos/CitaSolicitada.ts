import { EventoDominio } from "src/commun/dominio/eventos/Evento";



export class CitaSolicitada extends EventoDominio{
   
    constructor(
        private readonly IDDoctor:string,
        private readonly IDPaciente:string,
        private readonly IDCita:string,
        private readonly Status:string,
        private readonly Motivo:string,
        private readonly Modalidad: string
    ){
        super();
    }


    GetInformacion(): {} {
        return {
            nombre_evento: this.Nombre,
            fecha_generacion: this.Fecha,
            id_doctor: this.IDDoctor,
            id_paciente: this.IDPaciente,
            id_cita: this.IDCita,
            status: this.Status,
            motivo: this.Motivo,
            modalidad: this.Modalidad,
        }
    }


}

