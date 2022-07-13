import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion"

export class HistoriaVacio implements IExcepcion {
    public readonly origen = 'HistoriaVacio'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}