import { EventoDominio } from "../../../commun/dominio/eventos/Evento";

export class PacienteBloqueado extends EventoDominio{
   
    constructor(
        private readonly id_paciente:string,
        private readonly status_suscripccion:string,
        readonly Fecha: Date 
    ){
        super();
        this.Nombre = 'PacienteBloqueado';
        this.Fecha = Fecha 
    }


    GetInformacion(): {} {
        return {
            nombre_evento: this.Nombre,
            fecha_generacion: this.Fecha,
            id_paciente: this.id_paciente,
            status_suscripccion: this.status_suscripccion,
        }
    }
}
