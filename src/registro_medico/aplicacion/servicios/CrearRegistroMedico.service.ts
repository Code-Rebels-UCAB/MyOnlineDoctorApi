import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioRegistroMedico} from "../puertos/IRepositorioRegistroMedico";
import { CrearHistoriaMedica } from "../../../historia_medica/aplicacion/servicios/CrearHistoriaMedica.service";
import { CrearRegistroMedicoDTO } from "../dto/CrearRegistroMedicoDTO";


export class CrearRegistroMedico implements IServicioAplicacion<CrearRegistroMedicoDTO, void>{
    
    constructor(
        private readonly logger: ILogger,
        private readonly repositorioRegistroMedico: IRepositorioRegistroMedico,
        private readonly crearHistoria: CrearHistoriaMedica
        ) { }

    async ejecutar(datos: CrearRegistroMedicoDTO): Promise<Resultado<void>> {
        try {
            const historiaMedicaId = await this.repositorioRegistroMedico.ObtenerHistoriaMedicaAsociada('3a2ed3f9-5331-41a7-89e1-c8d1f76d23e7');
            //SE VERIFICA QUE TENGA EL REGISTRO MEDICO TENGA UN HISTORIA MEDICA CREADA, O SI ES EL PRIMER REGISTRO MEDICO DEL PACIENTE
            if (historiaMedicaId) {
                
            }
            else{
                //this.crearHistoria.ejecutar({id_paciente:  '3a2ed3f9-5331-41a7-89e1-c8d1f76d23e7'});
            }

            
            //const mapeadorRegistro = new RegistroMedicoMapeador();
            //const registroMedico:RegistroMedico = mapeadorRegistro.convertirPersistenciaEnDominio(comando);
            //this.crearHistoria.ejecutar({id_paciente:  '3a2ed3f9-5331-41a7-89e1-c8d1f76d23e7'});
            
        }
        catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error);
        }

    }
}