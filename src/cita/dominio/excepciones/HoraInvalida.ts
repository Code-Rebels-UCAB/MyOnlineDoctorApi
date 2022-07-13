import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion"

export class HoraInvalida implements IExcepcion {
    public readonly origen = 'HoraInvalida'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}