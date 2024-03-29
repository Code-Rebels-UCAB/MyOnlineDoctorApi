import { Diagnostico } from '../values/Diagnostico';
import { Examenes } from '../values/Examenes';
import { Historia } from '../values/Historia';
import { Plan } from '../values/Plan';
import { Prescripcion } from '../values/Prescripcion';
import { RegistroMedicoID } from '../../../commun/dominio/values/RegistroMedicoID';
import { DoctorID } from '../../../commun/dominio/values/DoctorID';
import { CitaID } from '../../../commun/dominio/values/CitaID';
import { Agregado } from '../../../commun/dominio/entidades/Agregado';
import { RegistroMedicoCreado } from '../eventos/RegistroMedicoCreado';
import { RegistroMedicoModificado } from '../eventos/RegistroMedicoModificado';

export class RegistroMedico extends Agregado<RegistroMedicoID> {
  constructor(
    private readonly id: RegistroMedicoID,
    private id_doctor: DoctorID,
    private id_cita: CitaID,
    private examenes: Examenes,
    private historia: Historia,
    private prescripcion: Prescripcion,
    private plan: Plan,
    private diagnostico: Diagnostico,
  ) {
    super();
  }

  //GETTERS
  public getExamenes(): Examenes {
    return this.examenes;
  }

  public getHistoria(): Historia {
    return this.historia;
  }

  public getPrescripccion(): Prescripcion {
    return this.prescripcion;
  }

  public getPlan(): Plan {
    return this.plan;
  }

  public getDiagnostico(): Diagnostico {
    return this.diagnostico;
  }

  public getDoctorID(): DoctorID {
    return this.id_doctor;
  }

  public getCitaID(): CitaID {
    return this.id_cita;
  }

  obtenerIdentificador(): RegistroMedicoID {
    return this.id;
  }

  //SETTERS
  public setExamenes(examenes: Examenes) {
    this.examenes = examenes;
  }

  public setHistoria(historia: Historia) {
    this.historia = historia;
  }

  public setPrescripcion(prescripcion: Prescripcion) {
    this.prescripcion = prescripcion;
  }

  setPlan(plan: Plan) {
    this.plan = plan;
  }

  setDiagnostico(diagnostico: Diagnostico) {
    this.diagnostico = diagnostico;
  }

  //METODOS
  esIgual(entidad: RegistroMedico): boolean {
    return (
      this.id.getRegistroMedicoID() ===
      entidad.obtenerIdentificador().getRegistroMedicoID()
    );
  }

  //EVENTOS DE DOMINIO
  public static crearRegistroMedico(
    examenes: Examenes,
    historia: Historia,
    prescripcion: Prescripcion,
    plan: Plan,
    diagnostico: Diagnostico,
    id_doctor: DoctorID,
    id_cita: CitaID,
  ): RegistroMedico {
    const id: RegistroMedicoID = RegistroMedicoID.crear();

    //Instancia de registro medico
    const registroMedico = new RegistroMedico(
      id,
      id_doctor,
      id_cita,
      examenes,
      historia,
      prescripcion,
      plan,
      diagnostico,
    );

    //Crear Evento
    registroMedico.agregarEvento(
      new RegistroMedicoCreado(
        id.getRegistroMedicoID().toString(),
        id_doctor.getDoctorID().toString(),
        id_cita.getCitaID().toString(),
        examenes.getExamenes(),
        historia.getHistoria(),
        prescripcion.getPrescripcion(),
        plan.getPlan(),
        diagnostico.getDiagnostico(),
      ),
    );

    return registroMedico;
  }

  public modificarRegistroMedico(
    examenes?: Examenes,
    historia?: Historia,
    prescripcion?: Prescripcion,
    plan?: Plan,
    diagnostico?: Diagnostico,
  ) {
    //Modificar RegistroMedico
    if (examenes != null && examenes != undefined) this.setExamenes(examenes);
    if (historia != null && historia != undefined) this.setHistoria(historia);
    if (prescripcion != null && prescripcion != undefined) {
      this.setPrescripcion(prescripcion);
    }
    if (plan != null && plan != undefined) this.setPlan(plan);
    if (diagnostico != null && diagnostico != undefined) {
      this.setDiagnostico(diagnostico);
    }

    this.agregarEvento(
      new RegistroMedicoModificado(
        this.obtenerIdentificador().getRegistroMedicoID().toString(),
        this.getDoctorID().getDoctorID().toString(),
        this.getCitaID().getCitaID().toString(),
        examenes.getExamenes(),
        historia.getHistoria(),
        prescripcion.getPrescripcion(),
        plan.getPlan(),
        diagnostico.getDiagnostico(),
      ),
    );
  }
}
