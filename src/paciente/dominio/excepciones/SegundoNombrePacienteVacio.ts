import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion"

export class SegundoNombrePacienteVacio implements IExcepcion {
    public readonly origen = 'SegundoNombrePacienteVacio'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}