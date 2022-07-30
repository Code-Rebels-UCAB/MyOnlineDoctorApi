import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { CrearHistoriaMedicaDTO } from "../../../historia_medica/aplicacion/dtos/CrearHistoriaMedicaDTO";
import { IRepositorioRegistroMedico} from "../puertos/IRepositorioRegistroMedico";
import { CrearHistoriaMedica } from "../../../historia_medica/aplicacion/servicios/CrearHistoriaMedica.service";


export class CrearRegistroMedico implements IServicioAplicacion<CrearHistoriaMedicaDTO, void>{
    
    constructor(
        private readonly logger: ILogger,
        private readonly repositorioRegistroMedico: IRepositorioRegistroMedico,
        private readonly crearHistoria: CrearHistoriaMedica
        ) { }

    async ejecutar(datos: CrearHistoriaMedicaDTO): Promise<Resultado<void>> {
        try {
            //const mapeadorRegistro = new RegistroMedicoMapeador();
            //const registroMedico:RegistroMedico = mapeadorRegistro.convertirPersistenciaEnDominio(comando);

            
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }

    }
}