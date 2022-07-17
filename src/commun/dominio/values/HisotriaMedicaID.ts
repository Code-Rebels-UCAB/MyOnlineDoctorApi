import { IValueObject } from "interfaceVO";
import { Guid } from "guid-typescript";


export class HistoriaMedicaID implements IValueObject {
  private readonly id: Guid;

  private constructor(id: Guid) {
    this.id = id;
  }

  public getHistoriaMedicaID() {
    return this.id;
  }

  public esIgual(historiaMedicaID: HistoriaMedicaID): boolean {
    return this.id == historiaMedicaID.getHistoriaMedicaID();
  }

  public static crear(id?: Guid){
    if (id) {
      return new HistoriaMedicaID(id);
    }
    return new HistoriaMedicaID(Guid.create());
  }
}
