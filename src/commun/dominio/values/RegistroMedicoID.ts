import { IValueObject } from './IValueObject';
import { Guid } from 'guid-typescript';

export class RegistroMedicoID implements IValueObject {
  private readonly id: Guid;

  private constructor(id: Guid) {
    this.id = id;
  }

  public getRegistroMedicoID(): Guid {
    return this.id;
  }

  public esIgual(id: RegistroMedicoID): boolean {
    return this.id == id.getRegistroMedicoID();
  }

  public static crear(id?: Guid) {
    if (id) {
      return new RegistroMedicoID(id);
    }
    return new RegistroMedicoID(Guid.create());
  }

}
