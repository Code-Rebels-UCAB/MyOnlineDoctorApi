import { IPolitica } from "../../../commun/aplicacion/puertos/IPolitica";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { EventoDominio } from "../../../commun/dominio/eventos/Evento";
import { BloquearCita } from "./BloquearCita.service";
import { CitasDoctor } from "./CitasDoctor.service";

export class BloquearCitasDoctor implements IPolitica<string,void>{
    public constructor(
        private readonly bloquearCita: BloquearCita,
        private readonly citasDoctor: CitasDoctor,
    ) {}

    Update(context: EventoDominio, data: string): void {
        if (context.Nombre == 'DoctorBloqueado') {
            this.ejecutar(data)
        }
    }

    async ejecutar(doctorId: string): Promise<Resultado<void>> {

        try{
            //SE COLABORA CON EL SERVICIO DE APLICACION CITASDOCTOR, PARA OBTENER TODAS LAS CITAS DEL DOCTOR 
            const citas = await this.citasDoctor.ejecutar(doctorId);
                
            //SE COMPRUEBA SI EL DOCTOR TIENE CITAS
            if (citas.valor.length > 0) {
                //SE FILTRAN LAS CITAS, PARA OBTENER LAS QUE NO TENGAN EL ESTADO DE FINALIZADA O INICIADA
                const citasFiltradas = citas.valor.filter( (cita) => { 
                    if (cita.statuscita != 'Finalizada' && cita.statuscita != 'Iniciada') {
                        return true;
                    }
                });
                //SE COLABORA CON EL SERVICIO DE APLICACION BLOQUEAR CITAS, PARA BLOQUEAR LAS CITAS DEL DOCTOR BLOQUEADO (QUE NO TENGAN EL ESTADO DE FINALIZADA O INICIADA)
                if (citasFiltradas.length > 0) {
                    for (const cita of citasFiltradas) {
                        await this.bloquearCita.ejecutar(cita.id_cita);
                    }   
                } 
            }        

            return Resultado.Exito<void>();
        }
        catch (error) {
            return Resultado.Falla(error);
        }

    }
}