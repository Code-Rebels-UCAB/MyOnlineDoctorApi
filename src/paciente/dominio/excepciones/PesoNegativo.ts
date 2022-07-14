import { IExcepcion } from "../../../commun/dominio/excepciones/IExcepcion"

export class PesoNegativo implements IExcepcion {
    public readonly origen = 'PesoNegativo'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}