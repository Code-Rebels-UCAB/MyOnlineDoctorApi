import { EventoDominio } from '../../../commun/dominio/eventos/Evento';


export class HistoriaMedicaCreada extends EventoDominio{

    constructor (
        private readonly id_historia: string,
        private readonly id_paciente: string,
        readonly Fecha: Date
    ){
        super();
        this.Nombre = 'HistoriaMedicaCreada';
        this.Fecha = Fecha 
    }

    GetInformacion(): {} { 
        return {
            nombre_evento: this.Nombre,
            fecha: this.Fecha,
            id_historia_medica: this.id_historia,
            id_paciente: this.id_paciente,
        }
    } 

}