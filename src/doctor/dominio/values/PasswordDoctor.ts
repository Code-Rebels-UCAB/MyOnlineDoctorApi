import { compileFunction } from "vm";
import { IValueObject } from "../../../commun/dominio/values/IValueObject"

export class PasswordDoctor implements IValueObject {
    
    private constructor(private readonly password:string) {
   
    }

    public getPasswordDoctor() {
      return this.password;
    }

    public esIgual(passwordDoctor: PasswordDoctor): boolean {
      return this.password == passwordDoctor.getPasswordDoctor() 
    }
}