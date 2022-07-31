import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { IRepositorioHistoriaMedica } from "../puertos/IRepositorioHistoriaMedica";
import { HistoriaMedica } from "../../../historia_medica/dominio/entidades/HistoriaMedica";
import { PacienteID } from "../../../commun/dominio/values/PacienteID";
import { Guid } from "guid-typescript";

export class CrearHistoriaMedica implements IServicioAplicacion<string,string>{

    constructor(
        private readonly logger: ILogger,
        private readonly repositorioHistoria: IRepositorioHistoriaMedica,
    ) {}

    async ejecutar(pacienteId: string): Promise<Resultado<string>> {

        try{
            //........AGREGADO DE HISTORIA MEDICA................
            const historiaMedica = HistoriaMedica.crearHistoria(PacienteID.crear(Guid.parse(pacienteId)));     
            
             //........EVENTOS DE DOMINIO................
            const eventos = historiaMedica.obtenerEventos();
            historiaMedica.limpiarEventos();

            //........DELEGAR EN EL REPOSITORIO LA PERSISTENCIA................
            const historiaCreada = await this.repositorioHistoria.crearHistoriaMedica(historiaMedica.obtenerIdentificador().getHistoriaMedicaID().toString(), historiaMedica.getPacienteID().getPacienteID().toString());

            this.logger.log("Ha sido creada la Historia Medica ID:" +  historiaMedica.obtenerIdentificador().getHistoriaMedicaID().toString(), '');
            return Resultado.Exito<string>(historiaMedica.obtenerIdentificador().getHistoriaMedicaID().toString());
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }
    }

}