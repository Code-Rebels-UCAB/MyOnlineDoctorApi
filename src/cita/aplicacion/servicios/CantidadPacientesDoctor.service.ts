import { IServicioAplicacion } from '../../../commun/aplicacion/IServicioAplicacion';
import { ILogger } from '../../../commun/aplicacion/ILogger';
import { IRepositorioCita } from '../puertos/IRepositorioCita';
import { Resultado } from '../../../commun/aplicacion/Resultado';
import { IExcepcion } from '../../../commun/dominio/excepcciones/IExcepcion';

export class CantidadPacientesDoctor
  implements IServicioAplicacion<string, number>
{
  public constructor(
    private readonly logger: ILogger,
    private readonly repositorioCita: IRepositorioCita,
  ) {}

  async ejecutar(data: string): Promise<Resultado<number>> {
    try {
      const cantidadPacientesDoctor =
        await this.repositorioCita.obtenerCantidadPacientesPorDoctor(data);
      this.logger.log(
        'Buscar Pacientes del doctor: ' + data,
        'Pacientes encontrados: ' + cantidadPacientesDoctor,
      );

      return Resultado.Exito<number>(cantidadPacientesDoctor);
    } catch (error) {
      const errores: IExcepcion = error;
      this.logger.error('Error inesperado: ', errores.mensaje);

      return Resultado.Falla(error);
    }
  }
}
