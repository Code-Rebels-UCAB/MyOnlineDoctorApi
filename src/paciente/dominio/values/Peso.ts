import { IValueObject } from "../../../commun/dominio/values/IValueObject"

export class Peso implements IValueObject {
    private constructor(private readonly valor:number) {

    }
  
    public getPesoValor() {
      return this.valor;
    }
  
    public esIgual(peso: Peso): boolean {
      return this.valor == peso.getPesoValor()
    }

  }
  