import { EventoDominio } from '../../../commun/dominio/eventos/Evento';

export class DoctorCalificado extends EventoDominio {
  constructor(
    private readonly id_doctor: string,
    private readonly id_paciente: string,
    private readonly calificacion: number,
  ) {
    super();
    this.Fecha = new Date();
    this.Nombre = 'DoctorCalificado';
  }

  public GetInformacion(): {} {
    return {
      id_doctor: this.id_doctor,
      id_paciente: this.id_paciente,
      calificacion: this.calificacion,
    };
  }
}
