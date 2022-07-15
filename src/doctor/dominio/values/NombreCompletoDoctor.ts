import { IValueObject } from 'interfaceVO';
import { NombreCompletoVacioDoctor } from '../excepciones/NombreCompletoVacioDoctor';
import { ApellidoCompletoVacioDoctor } from '../excepciones/ApellidoCompletoVacioDoctor';

export class NombreCompletoDoctor implements IValueObject {
  private constructor(
    private readonly nombre: string,
    private readonly apellido: string,
  ) {}

  public getNombre() {
    return this.nombre;
  }

  public getApellido() {
    return this.apellido;
  }

  public esIgual(nombreCompletoDoctor: NombreCompletoDoctor): boolean {
    return (
      this.nombre == nombreCompletoDoctor.getNombre() &&
      this.apellido == nombreCompletoDoctor.getApellido()
    );
  }

  public static crear(nombres: string, apellidos:string){
    if (nombres == null || nombres == undefined || nombres == ''){
      //LANZA LA EXCEPCION
      throw new NombreCompletoVacioDoctor('EL nombre completo del doctor no puede estar vacio');
    }
    else if (apellidos == null || apellidos == undefined || apellidos == ''){
      //LANZA LA EXCEPCION
      throw new ApellidoCompletoVacioDoctor('EL apellido completo del doctor no puede estar vacio');
    }

    return new NombreCompletoDoctor(nombres, apellidos)
    
  }

}
