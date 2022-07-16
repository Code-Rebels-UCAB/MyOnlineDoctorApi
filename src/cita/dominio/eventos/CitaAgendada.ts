import { EventoDominio } from "../../../commun/dominio/eventos/Evento";



export class CitaAgendada extends EventoDominio{
   
    constructor(
        private readonly IDDoctor:string,
        private readonly IDPaciente:string,
        private readonly IDCita:string,
        private readonly Status:string,
        private readonly Hora:string,
        private readonly Duracion:string,
        readonly Fecha: Date 
    ){
        super();
        this.Nombre = 'CitaAgendada';
        this.Fecha = Fecha 
    }


    GetInformacion(): {} {
        return {
            nombre_evento: this.Nombre,
            fecha_generacion: this.Fecha,
            id_doctor: this.IDDoctor,
            id_paciente: this.IDPaciente,
            id_cita: this.IDCita,
            status: this.Status,
            hora: this.Hora,
            duracion: this.Duracion
        }
    }
}




