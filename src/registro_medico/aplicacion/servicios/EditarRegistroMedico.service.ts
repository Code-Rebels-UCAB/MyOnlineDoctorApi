import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { RegistroMedicoDTO } from "../dto/RegistroMedicoDTO";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IRepositorioRegistroMedico } from "../puertos/IRepositorioRegistroMedico";
import { RegistroMedicoORM } from "src/registro_medico/infraestructura/persistencia/RegistroMedico.orm";
import { RegistroMedicoMapeador } from "../mapeador/RegistroMedicoMapeador";
import { RegistroMedicoRespuestaDTO } from "../dto/RegistroMedicoRespuestaDTO";

export class EditarRegistroMedico implements IServicioAplicacion<RegistroMedicoDTO, RegistroMedicoRespuestaDTO>{
    
    constructor(
        private readonly logger: ILogger,
        private readonly repositorioRegistroMedico: IRepositorioRegistroMedico,
    ) {}
    
    
    async ejecutar(data: RegistroMedicoDTO): Promise<Resultado<RegistroMedicoRespuestaDTO>> {
        try {
            const registroPersistencia: RegistroMedicoORM =  await this.repositorioRegistroMedico.ObtenerRegistroMedicobyID(data.IdRegistroMedico);
            if (registroPersistencia.doctor.id_doctor != data.IdDoctor) {
                throw new Error("El doctor no corresponde al registro medico por lo tanto no lo puede editar");
            }

            const registroMedicoDominio = RegistroMedicoMapeador.actualizarEnDominio(data);

            //TODO: Crear evento cuando el registro medico se actualiza

            const registroMedicoActualizado = RegistroMedicoMapeador.convertirDominioEnPersistencia(registroMedicoDominio);

            this.repositorioRegistroMedico.actualizarRegistroMedico(registroMedicoActualizado);

            this.logger.log("Se ha actualizado el Registro Medico ID:" + data.IdRegistroMedico, '');

            return Resultado.Exito<RegistroMedicoRespuestaDTO>(registroMedicoActualizado); 

        } catch (error) {
            let errores: IExcepcion = error;
            this.logger.error("Error inesperado:", errores.mensaje);
            return Resultado.Falla(error); 
        }
    }
    
}