import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion"

export class HoraVacia implements IExcepcion {
    public readonly origen = 'HoraVacia'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}