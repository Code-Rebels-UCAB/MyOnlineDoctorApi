import { Diagnostico } from "../values/Diagnostico";
import { Examenes } from "../values/Examenes";
import { Historia } from "../values/Historia";
import { Plan } from "../values/Plan";
import { Prescripcion } from "../values/Prescripcion";
import { RegistroMedicoID } from "../../../commun/dominio/values/RegistroMedicoID";
import { DoctorID } from "../../../commun/dominio/values/DoctorID";
import { CitaID } from "../../../commun/dominio/values/CitaID";


export class RegistroMedico {
  constructor(
    private id: RegistroMedicoID,
    private id_doctor: DoctorID,
    private id_cita: CitaID,
    private examenes: Examenes,
    private historia: Historia,
    private prescripccion: Prescripcion,
    private plan: Plan,
    private diagnostico: Diagnostico,
  ) {}

  public getRegistroMedicoID(): RegistroMedicoID{
    return this.id
  }
 
  public getExamenes(): Examenes{
    return this.examenes;
  }

  public getHistoria(): Historia{
    return this.historia;
  }

  public getPrescripccion(): Prescripcion{
    return this.prescripccion;
  }

  public getPlan(): Plan{
    return this.plan;
  }

  public getDiagnostico(): Diagnostico{
    return this.diagnostico;
  }

  public getDoctorID(): DoctorID{
    return this.id_doctor;
  }

  public getCitaID(): CitaID{
    return this.id_cita;
  }

}
