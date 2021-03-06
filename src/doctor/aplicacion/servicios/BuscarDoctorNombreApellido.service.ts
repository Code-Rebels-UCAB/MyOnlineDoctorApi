import { ILogger } from '../../../commun/aplicacion/puertos/ILogger';
import { IServicioAplicacion } from '../../../commun/aplicacion/IServicioAplicacion';
import { Resultado } from '../../../commun/aplicacion/Resultado';
import { IExcepcion } from '../../../commun/dominio/excepcciones/IExcepcion';
import { Doctor } from '../../dominio/entidades/Doctor';
import { ListadoDoctoresDTO } from '../dtos/ListadoDoctoresDTO';
import { DoctorMapeador } from '../mapeadores/DoctorMapeador';
import { IRepositorioDoctor } from '../puertos/IRepositorioDoctor';

export class BuscarDoctorNombreApellido
  implements IServicioAplicacion<string, ListadoDoctoresDTO[]>
{
  constructor(
    private readonly logger: ILogger,
    private readonly repositorioDoctor: IRepositorioDoctor,
  ) {}

  async ejecutar(data: string): Promise<Resultado<ListadoDoctoresDTO[]>> {
    try {
      const doctores =
        await this.repositorioDoctor.obtenerDoctorByNombreorApellido(data);

      const DoctoresDominio: Doctor[] = doctores.map((datos) =>
        DoctorMapeador.covertirPersistenciaDominio(datos),
      );

      const ListadoDoctores = DoctoresDominio.map((datos) =>
        DoctorMapeador.ConvertirDoctoresEnListado(datos),
      );

      this.logger.log(
        'Buscar por Nombre y Apellido: ' + data,
        'Doctores Encontrados: ' + ListadoDoctores.length,
      );

      return Resultado.Exito<ListadoDoctoresDTO[]>(ListadoDoctores);
    } catch (error) {
      let errores: IExcepcion = error;
      this.logger.error('Error inesperado: ' + data, errores.mensaje);
      return Resultado.Falla(error);
    }
  }
}
