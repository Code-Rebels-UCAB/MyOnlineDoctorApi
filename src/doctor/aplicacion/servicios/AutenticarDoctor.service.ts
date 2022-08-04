import { ILogger } from '../../../commun/aplicacion/puertos/ILogger';
import { Resultado } from '../../../commun/aplicacion/Resultado';
import { IServicioAplicacion } from '../../../commun/aplicacion/IServicioAplicacion';
import { IRepositorioDoctor } from '../puertos/IRepositorioDoctor';
import { IExcepcion } from '../../../commun/dominio/excepcciones/IExcepcion';
import { AutenticarDoctorDTO } from '../dtos/AutenticarDoctorDTO';

export class AutenticarDoctor
  implements IServicioAplicacion<AutenticarDoctorDTO, string>
{
  public constructor(
    private readonly logger: ILogger,
    private readonly repositorioDoctor: IRepositorioDoctor,
  ) {}

  async ejecutar(data: AutenticarDoctorDTO): Promise<Resultado<string>> {
    try {
      const response = await this.repositorioDoctor.autenticarDoctor(
        data.correo,
        data.password,
      );

      if (response) {
        this.logger.log(
          'Autenticar doctor de correo: ' + data.correo,
          'Autenticacion exitosa',
        );

        return Resultado.Exito<string>(response);
      } else {
        this.logger.log(
          'Autenticar doctor de correo: ' + data.correo,
          'Autenticacion fallida',
        );

        return Resultado.Falla(response);
      }
    } catch (error) {
      const errores: IExcepcion = error;
      this.logger.error('Error inesperado: ', errores.mensaje);

      return Resultado.Falla(error);
    }
  }
}
