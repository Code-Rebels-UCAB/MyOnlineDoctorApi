import { EventoDominio } from "../../../commun/dominio/eventos/Evento";



export class CitaBloqueada extends EventoDominio{
   
    constructor(
        private readonly IDDoctor:string,
        private readonly IDPaciente:string,
        private readonly IDCita:string,
        private readonly Status:string,
        readonly Fecha: Date 
    ){
        super();
        this.Nombre = 'CitaBloqueada';
        this.Fecha = Fecha 
    }


    GetInformacion(): {} {
        return {
            nombre_evento: this.Nombre,
            fecha: this.Fecha,
            id_doctor: this.IDDoctor,
            id_paciente: this.IDPaciente,
            id_cita: this.IDCita,
            status: this.Status,
        }
    }
}