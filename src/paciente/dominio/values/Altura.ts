import { IValueObject } from "../../../commun/dominio/values/IValueObject"

export class Altura implements IValueObject {
    private constructor(private readonly valor: number) {

    }
  
    public getAlturaValor() {
      return this.valor;
    }
  
    public esIgual(altura: Altura): boolean {
      return this.valor == altura.getAlturaValor()
    }

  }
  