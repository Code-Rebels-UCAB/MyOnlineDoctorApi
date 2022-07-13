import { IValueObject } from "../../../commun/dominio/values/IValueObject"
import { AlturaNegativa } from "../excepciones/AlturaNegativa";
import { AlturaVacio } from "../excepciones/AlturaVacio";

export class Altura implements IValueObject {
  private constructor(private readonly valor: number) {}

  public getAlturaValor() {
    return this.valor;
  }

  public esIgual(altura: Altura): boolean {
    return this.valor == altura.getAlturaValor()
  }

  public static crear(valor: number){
    if (valor == null || valor == undefined){
      //LANZA LA EXCEPCION
      throw new AlturaVacio('La altura del paciente no puede estar vacia');
    }else if(valor <= 0 ){
      //LANZA EXCEPCION DE QUE ALTURA NO PUEDE SER MENOR O IGUAL A CERO
      throw new AlturaNegativa('La altura del paciente no puede ser igual o menor a cero')
    }
    return new Altura(valor);
  }
    
}
  