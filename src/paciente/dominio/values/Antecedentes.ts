import { IValueObject } from "../../../commun/dominio/values/IValueObject"

export class Antecedentes implements IValueObject {
    private constructor(private readonly valor: string) {

    }
  
    public getAntecedentesValor() {
      return this.valor;
    }
  
    public esIgual(antecedentes: Antecedentes): boolean {
      return this.valor == antecedentes.getAntecedentesValor()
    }

  }
  