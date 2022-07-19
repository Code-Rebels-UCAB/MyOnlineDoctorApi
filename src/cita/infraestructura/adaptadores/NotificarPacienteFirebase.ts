import { IPolitica } from "../../../commun/aplicacion/puertos/IPolitica";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { EventoDominio } from "../../../commun/dominio/eventos/Evento";


export class NotificarPacienteFirebase implements IPolitica<string,void>{

    Update(context: EventoDominio, data: string): void {
        if (context.Nombre = 'CitaAgendada') {
            this.ejecutar(data)
        }
    }


    ejecutar(data: string): Promise<Resultado<void>> {
        console.log(data);
        //LOGICA DE NOTIFICAR PACIENTE LLAMADA
        return null;


    }

}