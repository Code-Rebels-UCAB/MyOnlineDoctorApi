import { ILogger } from '../../../commun/aplicacion/ILogger';
import { IServicioAplicacion } from 'src/commun/aplicacion/IServicioAplicacion';
import { Resultado } from '../../../commun/aplicacion/Resultado';
import { IExcepcion } from '../../../commun/dominio/excepcciones/IExcepcion';
import { RepositorioPaciente } from '../../infraestructura/adaptadores/RepositorioPaciente';

export class BuscarCantidadTodosLosPacientes
  implements IServicioAplicacion<string, number>
{
  constructor(
    private readonly logger: ILogger,
    private readonly repositorioPaciente: RepositorioPaciente,
  ) {}

  async ejecutar(data?: string): Promise<Resultado<number>> {
    try {
      const cantidadPacientes =
        await this.repositorioPaciente.obtenerCantidadTotalPacientes();
      this.logger.log(
        'Buscar todos los pacientes.',
        'Pacientes encontrados: ' + cantidadPacientes,
      );

      return Resultado.Exito<number>(cantidadPacientes);
    } catch (error) {
      const errores: IExcepcion = error;
      this.logger.error('Error inesperado: ', errores.mensaje);

      return Resultado.Falla(error);
    }
  }
}
