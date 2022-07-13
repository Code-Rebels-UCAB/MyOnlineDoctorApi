import { IValueObject } from 'src/commun/dominio/values/IValueObject';
import { FechaInvalida } from '../excepciones/FechaInvalida';
import { FechaNacimientoVacio } from '../excepciones/FechaNacimientoVacio';
import { PacienteMenorEdad } from '../excepciones/PacienteMenorEdad';

export class FechaDeNacimiento implements IValueObject {
  private constructor(private readonly fecha: Date) {}

  public getFechaNacimiento(): Date {
    return this.fecha;
  }

  public esIgual(fecha: FechaDeNacimiento): boolean {
    return this.fecha == fecha.getFechaNacimiento();
  }

  private static calculateAge(fecha):number{ // birthday is a date
    const dob = new Date(fecha).getTime();
    const dateToCompare = new Date().getTime();
    const age = (dateToCompare - dob) / (365 * 24 * 60 * 60 * 1000);
    return Math.floor(age);
  }


  public static crear(fecha: Date){
    if (fecha == null || fecha == undefined){
      //LANZA LA EXCEPCION
      throw new FechaNacimientoVacio('La fecha de nacimiento no puede estar vacia');
    }
    else if(FechaDeNacimiento.calculateAge(fecha) < 18){
      throw new PacienteMenorEdad('El paciente no puede ser menor de edad');
    }
    else if(!(fecha instanceof Date)){
      throw new FechaInvalida('La fecha ingresada no es valida');
    }
    return new FechaDeNacimiento(fecha);
  }
 
}