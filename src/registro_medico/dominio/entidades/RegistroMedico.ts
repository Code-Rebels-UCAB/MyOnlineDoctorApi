import { Diagnostico } from "../values/Diagnostico";
import { Examenes } from "../values/Examenes";
import { Historia } from "../values/Historia";
import { Plan } from "../values/Plan";
import { Prescripcion } from "../values/Prescripcion";
import { RegistroMedicoID } from "../../../commun/dominio/values/RegistroMedicoID";


export class RegistroMedico {
  constructor(
    private id: RegistroMedicoID,
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

}
