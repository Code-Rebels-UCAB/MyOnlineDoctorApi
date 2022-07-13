import { IValueObject } from "interfaceVO";

export class Duracion implements IValueObject {
    
    constructor(private readonly _duracion: number) {}

    public get duracion(): number {
        return this._duracion;
    }

    public esIgual(duracion: Duracion): boolean {
        return this._duracion == duracion.duracion;
    }
}