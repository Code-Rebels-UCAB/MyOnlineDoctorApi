import { IExcepcion } from "./IExcepcion"

export class FechaVacio implements IExcepcion {
    public readonly origen = 'FechaVacio'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}