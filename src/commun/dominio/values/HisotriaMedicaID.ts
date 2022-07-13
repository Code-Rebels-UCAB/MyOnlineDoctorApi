import { IValueObject } from "interfaceVO";
import { Guid } from "guid-typescript";


export class HistoriaMedicaID implements IValueObject {
  private readonly id: Guid;

  private constructor() {
    this.id = Guid.create();
  }

  public getHistoriaMedicaID() {
    return this.id;
  }

  public esIgual(historiaMedicaID: HistoriaMedicaID): boolean {
    return this.id == historiaMedicaID.getHistoriaMedicaID();
  }

  public static crear(){
    return new HistoriaMedicaID();
  }
}
