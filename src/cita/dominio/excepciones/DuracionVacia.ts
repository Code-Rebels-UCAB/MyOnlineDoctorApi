import { IExcepcion } from "../../../commun/dominio/excepciones/IExcepcion";

export class DuracionVacia implements IExcepcion {
    public readonly origen = 'DuracionVacia';
    public constructor(public readonly mensaje: string) {}
    public getError() {
        return {
            mensaje: this.mensaje,
            origen: this.origen,
        };
    }
}