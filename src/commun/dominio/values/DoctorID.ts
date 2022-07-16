import { IValueObject } from 'interfaceVO';
import { Guid } from 'guid-typescript';

export class DoctorID implements IValueObject {
  private readonly id: Guid;

  private constructor(id: Guid) {
    this.id = id;
  }

  public getDoctorID() {
    return this.id;
  }

  public esIgual(doctorid: DoctorID): boolean {
    return this.id == doctorid.getDoctorID();
  }

  public static crear(id?: Guid){
    if (id) {
      return new DoctorID(id);
    }
    return new DoctorID(Guid.create());
  }

}