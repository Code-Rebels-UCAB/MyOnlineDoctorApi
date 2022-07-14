import { IExcepcion } from "../../../commun/dominio/excepciones/IExcepcion"

export class FechaInvalida implements IExcepcion {
    public readonly origen = 'FechaInvalida'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}