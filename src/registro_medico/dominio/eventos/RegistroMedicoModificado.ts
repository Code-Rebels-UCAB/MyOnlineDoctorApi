import { EventoDominio } from '../../../commun/dominio/eventos/Evento';

export class RegistroMedicoModificado extends EventoDominio {
  constructor(
    private readonly id_registroMedico?: string,
    private readonly id_doctor?: string,
    private readonly id_cita?: string,
    private readonly examenes?: string,
    private readonly historia?: string,
    private readonly prescripcion?: string,
    private readonly plan?: string,
    private readonly diagnostico?: string,
  ) {
    super();
    this.Fecha = new Date();
    this.Nombre = 'RegistroMedicoModificado';
  }

  public GetInformacion(): {} {
    return {
      id_registroMedico: this.id_registroMedico,
      id_doctor: this.id_doctor,
      id_cita: this.id_cita,
      examenes: this.examenes,
      historia: this.historia,
      prescripcion: this.prescripcion,
      plan: this.plan,
      diagnostico: this.diagnostico,
    };
  }
}
