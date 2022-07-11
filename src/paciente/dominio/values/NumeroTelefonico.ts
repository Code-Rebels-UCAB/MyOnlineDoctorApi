import { IValueObject } from "../../../commun/dominio/values/IValueObject"

export class NumeroTelefonico implements IValueObject {
    private constructor(private readonly valor: string) {

    }
  
    public getNumeroTelefonicoValor() {
      return this.valor;
    }
  
    public esIgual(numeroTelefonico: NumeroTelefonico): boolean {
      return this.valor == numeroTelefonico.getNumeroTelefonicoValor()
    }

  }
  