import { IPolitica } from 'src/commun/aplicacion/puertos/IPolitica';
import { Resultado } from 'src/commun/aplicacion/Resultado';
import { EventoDominio } from 'src/commun/dominio/eventos/Evento';
import { BloquearCita } from './BloquearCita.service';
import { BuscarCitasPaciente } from './BuscarCitasPaciente.service';
import { Logger } from '@nestjs/common';

export class BloquearCitasPaciente implements IPolitica<string, void> {
  private logger: Logger;
  constructor(
    private readonly bloquearCita: BloquearCita,
    private readonly citasPaciente: BuscarCitasPaciente,
  ) {
    this.logger = new Logger();
  }

  Update(context: EventoDominio, data: string): void {
    if (
      context.Nombre == 'PacienteSuspendido' ||
      context.Nombre == 'PacienteBloqueado'
    ) {
      this.ejecutar(data);
    }
  }

  async ejecutar(pacienteID: string): Promise<Resultado<void>> {
    try {
      const citasPaciente = await this.citasPaciente.ejecutar(pacienteID);
      if (citasPaciente.valor) {
        const citasFiltro = citasPaciente.valor.filter(
          (cita) =>
            cita.statuscita != 'Finalizada' && cita.statuscita != 'Iniciada',
        );

        if (citasFiltro.length > 0) {
          citasFiltro.forEach(
            async (cita) => await this.bloquearCita.ejecutar(cita.id_cita),
          );
        }
      }

      return Resultado.Exito<void>();
    } catch (error) {
      return Resultado.Falla(error);
    }
  }
}
