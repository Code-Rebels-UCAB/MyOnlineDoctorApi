import { IValueObject } from '../../../commun/dominio/values/IValueObject';
import { PrimerApellidoPacienteVacio } from '../excepciones/PrimerApellidoPacienteVacio';
import { PrimerNombrePacienteVacio } from '../excepciones/PrimerNombrePacienteVacio';
import { SegundoApellidoPacienteVacio } from '../excepciones/SegundoApellidoPacienteVacio';
import { SegundoNombrePacienteVacio } from '../excepciones/SegundoNombrePacienteVacio';

export class NombrePaciente implements IValueObject {
  private constructor(
    private readonly primer_nombre: string,
    private readonly segundo_nombre: string,
    private readonly primer_apellido: string,
    private readonly segundo_apellido: string,
  ) {}

  public getPrimerNombre(): string {
    return this.primer_nombre;
  }

  public getSegundoNombre(): string {
    return this.segundo_nombre;
  }

  public getPrimerApellido(): string {
    return this.primer_apellido;
  }

  public getSegundoApellido(): string {
    return this.segundo_apellido;
  }

  public esIgual(nombre: NombrePaciente): boolean {
    return (
      this.primer_nombre == nombre.getPrimerNombre() &&
      this.segundo_nombre == nombre.getSegundoNombre() &&
      this.primer_apellido == nombre.getPrimerApellido() &&
      this.segundo_apellido == nombre.getSegundoApellido()
    );
  }

  public static crear(primer_nombre: string, segundo_nombre: string, primer_apellido:string, segundo_apellido:string){
    if (primer_nombre == null || primer_nombre == undefined || primer_nombre == ''){
      //LANZA LA EXCEPCION
      throw new PrimerNombrePacienteVacio('EL primer nombre del paciente no puede estar vacio');
    }
    else if (primer_apellido == null || primer_apellido == undefined || primer_apellido == ''){
      //LANZA LA EXCEPCION
      throw new PrimerApellidoPacienteVacio('EL primer apellido del paciente no puede estar vacio');
    }
    else if(segundo_apellido == null || segundo_apellido == undefined || segundo_apellido == ''){
      //LANZA LA EXCEPCION
      throw new SegundoApellidoPacienteVacio('EL segundo apellido del paciente no puede estar vacio');
    }
    // else if(segundo_nombre == null || segundo_nombre == undefined || segundo_nombre == ''){
    //   //LANZA LA EXCEPCION
    //   throw new SegundoNombrePacienteVacio('EL segundo nombre del paciente no puede estar vacio');
    // }

    return new NombrePaciente(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido)
    
  }
}
