import { IServicioAplicacion } from '../../../commun/aplicacion/IServicioAplicacion';
import { ILogger } from '../../../commun/aplicacion/ILogger';
import { IRepositorioCita } from '../puertos/IRepositorioCita';
import { Resultado } from 'src/commun/aplicacion/Resultado';
import { IExcepcion } from 'src/commun/dominio/excepcciones/IExcepcion';

export class CantidadCitasDiaDoctor
  implements IServicioAplicacion<string, number>
{
  public constructor(
    private readonly logger: ILogger,
    private readonly repositorioCita: IRepositorioCita,
  ) {}

  async ejecutar(data: string): Promise<Resultado<number>> {
    try {
      const cantidadCitasDia =
        await this.repositorioCita.obtenerCantidadCitasDelDiaDoctor(data);
      this.logger.log(
        'Buscar Citas del Dia del doctor: ' + data,
        'Citas encontradas: ' + cantidadCitasDia,
      );

      return Resultado.Exito<number>(cantidadCitasDia);
    } catch (error) {
      const errores: IExcepcion = error;
      this.logger.error('Error inesperado: ', errores.mensaje);

      return Resultado.Falla(error);
    }
  }
}
