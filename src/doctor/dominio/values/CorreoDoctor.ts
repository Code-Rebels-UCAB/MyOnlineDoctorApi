import { compileFunction } from "vm";
import { IValueObject } from "../../../commun/dominio/values/IValueObject"

export class CorreoDoctor implements IValueObject {
    
    private constructor(private readonly correo:string) {
   
    }

    public getCorreoDoctor() {
      return this.correo;
    }

    public esIgual(correoDoctor: CorreoDoctor): boolean {
      return this.correo == correoDoctor.getCorreoDoctor() 
    }
}