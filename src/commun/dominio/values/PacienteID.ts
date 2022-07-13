import { IValueObject } from "interfaceVO";
import { Guid } from "guid-typescript";


export class PacienteID implements IValueObject {
  private readonly id: Guid;

  private constructor() {
    this.id = Guid.create();
  }

  public getPacienteID() {
    return this.id;
  }

  public esIgual(pacienteID: PacienteID): boolean {
    return this.id == pacienteID.getPacienteID();
  }
}