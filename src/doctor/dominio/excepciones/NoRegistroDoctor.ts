
import { IExcepcion } from "../../../commun/dominio/excepcciones/IExcepcion"

export class NoRegistroDoctor implements IExcepcion {
    public readonly origen = 'DoctorNoCreoEsteRegistroMedico'
    public constructor(public readonly mensaje: string) {}

    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
}