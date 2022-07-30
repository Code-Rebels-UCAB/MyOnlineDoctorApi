import { IServicioAplicacion } from "src/commun/aplicacion/IServicioAplicacion";
import { ILogger } from "src/commun/aplicacion/puertos/ILogger";
import { Resultado } from "src/commun/aplicacion/Resultado";
import { IExcepcion } from "src/commun/dominio/excepcciones/IExcepcion";
import { Paciente } from "src/paciente/dominio/entidades/Paciente";
import { ConsultarPacienteRespuestaDTO } from "../dto/queries/ConsultarPaciente.query";
import { PacienteMapeador } from "../mappeador/PacienteMapeador";
import { IRepositorioPaciente } from "../puertos/IRepositorioPaciente";


export class BuscarPacienteNombre
  implements IServicioAplicacion<string, ConsultarPacienteRespuestaDTO[]>
{
  constructor(
    private readonly logger: ILogger,
    private readonly repositorioPaciente: IRepositorioPaciente,
  ) {}

  async ejecutar(data: string): Promise<Resultado<ConsultarPacienteRespuestaDTO[]>> {
    try {
      const pacientes =
        await this.repositorioPaciente.obtenerPacienteByNombreorApellido(data);  
         
      const PacienteDominio: Paciente[] = pacientes.map((datos) =>
        PacienteMapeador.covertirPersistenciaDominio(datos),
      );
      const ListadoPaciente = PacienteDominio.map((datos) =>
        PacienteMapeador.covertirDominioPersistencia(datos),
      );

      return Resultado.Exito<ConsultarPacienteRespuestaDTO[]>(ListadoPaciente);
    } catch (error) {
      let errores: IExcepcion = error;
      this.logger.error('Error inesperado: ' + data, errores.mensaje);
      return Resultado.Falla(error);
    }
  }
}