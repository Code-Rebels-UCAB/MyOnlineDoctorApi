import { EventoDominio } from '../../../commun/dominio/eventos/Evento';

export class DoctorBloqueado extends EventoDominio {
  constructor(
    private readonly id_doctor: string,
    private readonly status: string,
  ) {
    super();
    this.Fecha = new Date();
    this.Nombre = 'DoctorBloqueado';
  }

  public GetInformacion(): {} {
    return {
      id_doctor: this.id_doctor,
      status: this.status,
    };
  }
}
