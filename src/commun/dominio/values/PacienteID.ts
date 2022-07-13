
import { Guid } from 'guid-typescript';
import { IValueObject } from 'interfaceVO';

export class PacienteID implements IValueObject {
  private readonly id: Guid;

  constructor() {
    this.id = Guid.create();
  }

  public getPacienteID(): Guid {
    return this.id;
  }

  public esIgual(id: PacienteID): boolean {
    return this.id == id.getPacienteID();
  }
}
