import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion"

export class NombreCompletoVacioDoctor implements IExcepcion {
    public readonly origen = 'NombreCompletoVacioDoctor'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}