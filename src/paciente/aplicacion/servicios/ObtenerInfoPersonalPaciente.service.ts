import { ILogger } from '../../../commun/aplicacion/puertos/ILogger';
import { IServicioAplicacion } from '../../../commun/aplicacion/IServicioAplicacion';
import { Resultado } from '../../../commun/aplicacion/Resultado';
import { IExcepcion } from '../../../commun/dominio/excepcciones/IExcepcion';
import { ConsultarPacienteRespuestaDTO } from '../dto/queries/ConsultarPaciente.query';
import { PacienteInfoPersistenciaDTO } from '../../../paciente/infraestructura/dto/PacienteInfoPersistenciaDTO';
import { PacienteInfoDTO } from '../dto/queries/PacienteInfoDTO';
import { IRepositorioPaciente } from '../puertos/IRepositorioPaciente';
import { PacienteMapeador } from '../mappeador/PacienteMapeador';

export class ObtenerInfoPersonalPaciente implements IServicioAplicacion<string, PacienteInfoDTO>
{
  constructor(
    private readonly logger: ILogger,
    private readonly repositorioPaciente: IRepositorioPaciente,
  ) {}

  async ejecutar(data?: string): Promise<Resultado<PacienteInfoDTO>> {
    try {
      
        const pacientePersistencia: PacienteInfoPersistenciaDTO = await this.repositorioPaciente.obtenerPacienteById(data);

        let pacienteInfo: PacienteInfoDTO = PacienteMapeador.ConvertirPersistenciaEnInfoPaciente(pacientePersistencia);

        this.logger.log('Obtener Informacion Personal pacientr','Paciente: ' + data);
        return Resultado.Exito<PacienteInfoDTO>(pacienteInfo);
        
    } 
    catch (error) {
      const errores: IExcepcion = error;
      this.logger.error('Error inesperado: ', errores.mensaje);

      return Resultado.Falla(error);
    }
  }
}
