import { IValueObject } from 'interfaceVO';
import { Guid } from 'guid-typescript';

export class DoctorID implements IValueObject {
  private readonly id: Guid;

  private constructor() {
    this.id = Guid.create();
  }

  public getDoctorID() {
    return this.id;
  }

  public esIgual(doctorid: DoctorID): boolean {
    return this.id == doctorid.getDoctorID();
  }

  public static crear(){
    return new DoctorID();
  }
}