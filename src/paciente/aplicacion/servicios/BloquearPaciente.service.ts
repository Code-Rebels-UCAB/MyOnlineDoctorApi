import { IServicioAplicacion } from '../../../commun/aplicacion/IServicioAplicacion';
import { ManejadorEventos } from '../../../commun/aplicacion/ManejadorEventos';
import { ILogger } from '../../../commun/aplicacion/puertos/ILogger';
import { Resultado } from '../../../commun/aplicacion/Resultado';
import { IRepositorioPaciente } from '../puertos/IRepositorioPaciente';
import { IExcepcion } from '../../../commun/dominio/excepcciones/IExcepcion';
import { PacienteMapeador } from '../mappeador/PacienteMapeador';

export class BloquearPaciente implements IServicioAplicacion<string, void> {
  constructor(
    private readonly logger: ILogger,
    private readonly repositorioPaciente: IRepositorioPaciente,
    private readonly manager: ManejadorEventos<string>,
  ) {}

  async ejecutar(data: string): Promise<Resultado<void>> {
    try {
      //INSTANCIA DE PACIENTE
      const pacientePersistencia =
        await this.repositorioPaciente.obtenerPacienteById(data);
      const paciente =
        PacienteMapeador.covertirPersistenciaDominio(pacientePersistencia);

      //EVENTO BLOQUEAR PACIENTE
      paciente.bloquearStatusPaciente();
      const eventos = paciente.obtenerEventos();
      paciente.limpiarEventos();

      //PERSISTIR CAMBIO
      const pacienteBloqueado = await this.repositorioPaciente.bloquearPaciente(
        data,
      );
      this.logger.log(
        'Paciente: ' + paciente.getPacienteID().getPacienteID().toString(),
        'Bloqueado',
      );

      //EVENTOS
      this.manager.AddEvento(...eventos);
      this.manager.Notify(paciente.getPacienteID().getPacienteID().toString());

      return Resultado.Exito<void>(pacienteBloqueado);
    } catch (error) {
      const errores: IExcepcion = error;
      this.logger.error('Error inesperado:', errores.getError().mensaje);

      return Resultado.Falla(error);
    }
  }
}
