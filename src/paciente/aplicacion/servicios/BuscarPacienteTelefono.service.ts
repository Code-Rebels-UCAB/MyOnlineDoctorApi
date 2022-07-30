import { IServicioAplicacion } from "../../../commun/aplicacion/IServicioAplicacion";
import { ILogger } from "../../../commun/aplicacion/puertos/ILogger";
import { Resultado } from "../../../commun/aplicacion/Resultado";
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion";
import { PacienteInfoDTO } from "../dto/queries/PacienteInfoDTO";
import { PacienteMapeador } from "../mappeador/PacienteMapeador";
import { IRepositorioPaciente } from "../puertos/IRepositorioPaciente";

export class BuscarPacienteTelefono
  implements IServicioAplicacion<string, PacienteInfoDTO[]>
{
  constructor(
    private readonly logger: ILogger,
    private readonly repositorioPaciente: IRepositorioPaciente,
  ) {}

  async ejecutar(data: string): Promise<Resultado<PacienteInfoDTO[]>> {
    try {
      const pacientes =
        await this.repositorioPaciente.obtenerPacienteByTelefono(data);  
         
      const PacienteLista: PacienteInfoDTO[] = pacientes.map((datos) =>
        PacienteMapeador.ConvertirPersistenciaEnInfoPaciente(datos),
      );

      this.logger.log(
        'Buscar por Telefono: ' + data,
        'Pacientes Encontrados: ' + PacienteLista.length,
      );  
      return Resultado.Exito<PacienteInfoDTO[]>(PacienteLista);
    } catch (error) {
      let errores: IExcepcion = error;
      this.logger.error('Error inesperado: ' + data, errores.mensaje);
      return Resultado.Falla(error);
    }
  }
}