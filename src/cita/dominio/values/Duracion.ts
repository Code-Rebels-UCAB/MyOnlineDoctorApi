import { IValueObject } from "../../../commun/dominio/values/IValueObject"

export class Duracion implements IValueObject {
    
    constructor(readonly _duracion: number) {}

    public get duracion(): number {
        return this._duracion;
    }

    public esIgual(duracion: Duracion): boolean {
        return this._duracion == duracion.duracion;
    }
}