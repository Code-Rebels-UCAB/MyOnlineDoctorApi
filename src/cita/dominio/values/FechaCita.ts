import { IValueObject } from "interfaceVO";


export class FechaCita implements IValueObject {
    constructor (private readonly _fechaCita: Date ) {}

    public get fechaCita() : Date {
        return this._fechaCita;
    }

    public esIgual(fechaCita: FechaCita): boolean {
        return this._fechaCita == fechaCita.fechaCita;
    }
}