import { IValueObject } from "interfaceVO";
import { Guid } from "guid-typescript";


export class PacienteID implements IValueObject {
  private readonly id: Guid;

  private constructor(id: Guid) {
    this.id = id;
  }

  public getPacienteID() {
    return this.id;
  }

  public esIgual(pacienteID: PacienteID): boolean {
    return this.id == pacienteID.getPacienteID();
  }

  public static crear(id?: Guid){
    if (id){
      return new PacienteID(id);
    }
    return new PacienteID(Guid.create());
  }
}
