import { IValueObject } from "../../../commun/dominio/values/IValueObject"
import { PesoNegativo } from "../excepciones/PesoNegativo";
import { PesoVacio } from "../excepciones/PesoVacio";

export class Peso implements IValueObject {
    private constructor(private readonly valor:number) {}
  
    public getPesoValor() {
      return this.valor;
    }
  
    public esIgual(peso: Peso): boolean {
      return this.valor == peso.getPesoValor()
    }

    public static crear(valor:number){
      if(valor == null || valor == undefined){
        throw new PesoVacio('El peso del paciente no puede estar vacio')
      }      
      else if(valor <= 0){
        throw new PesoNegativo('El peso del paciente no puede ser negativo');
      }

      return new Peso(valor);
    }

}
  