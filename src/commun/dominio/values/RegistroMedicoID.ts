import { IValueObject } from './IValueObject';
import { Guid } from 'guid-typescript';

export class RegistroMedicoID implements IValueObject {
  private readonly id: Guid;

  private constructor() {
    this.id = Guid.create();
  }

  public getRegistroMedicoID(): Guid {
    return this.id;
  }

  public esIgual(id: RegistroMedicoID): boolean {
    return this.id == id.getRegistroMedicoID();
  }

  public static crear(){
    return new RegistroMedicoID();
  }

}
