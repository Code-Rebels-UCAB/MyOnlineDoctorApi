import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { ListadoRegistrosMedicoDTO } from "../dto/ListadoRegistrosMedicosDTO";
import { IRepositorioRegistroMedico } from "../puertos/IRepositorioRegistroMedico";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";

class ObtenerRegistrosPaciente implements IServicioAplicacion<string, ListadoRegistrosMedicoDTO>{
    constructor(
        private readonly logger: ILogger,
        private readonly repositorioRegistroMedico: IRepositorioRegistroMedico,
    ) {}

    async ejecutar(data: string): Promise<Resultado<ListadoRegistrosMedicoDTO>> {
        try {
            const registroPersistencia =  await this.repositorioRegistroMedico.ObtenerRegistrosMedicosByPaciente(data);
            
            // this.logger.log("Se ha actualizado el Registro Medico ID:" + data.IdRegistroMedico, '');

            return Resultado.Exito<null>(); 

        } catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error); 
        }
    }

}