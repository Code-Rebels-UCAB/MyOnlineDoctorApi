import { IExcepcion } from "../dominio/excepcciones/IExcepcion"

export class Resultado<T> {
  public readonly esExitoso: boolean
  public readonly error: T 
  public readonly valor: T

  private constructor(esExitoso: boolean, valor?: T, error?: T) {
    this.esExitoso = esExitoso
    this.valor = valor
    this.error = error
  }

  public static Exito<U>(valor?: U): Resultado<U> {
    return new Resultado<U>(true, valor)
  }

  public static Falla<U extends IExcepcion>(error: U): Resultado<U> {
    return new Resultado<U>(false, null, error)
  }
}