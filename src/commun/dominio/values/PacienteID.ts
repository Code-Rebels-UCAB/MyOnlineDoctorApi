<<<<<<< HEAD

import { Guid } from 'guid-typescript';
import { IValueObject } from 'interfaceVO';
=======
import { IValueObject } from "interfaceVO";
import { Guid } from "guid-typescript";

>>>>>>> main

export class PacienteID implements IValueObject {
  private readonly id: Guid;

<<<<<<< HEAD
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
=======
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
>>>>>>> main
