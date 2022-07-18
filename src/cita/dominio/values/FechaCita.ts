import { IValueObject } from "interfaceVO";
import { FechaVacio } from "../../../commun/dominio/excepcciones/FechaVacio";


export class FechaCita implements IValueObject {
    constructor (private readonly _fechaCita: string ) {}

    public get fechaCita() : string {
        return this._fechaCita;
    }

    public esIgual(fechaCita: FechaCita): boolean {
        return this._fechaCita == fechaCita.fechaCita;
    }

    public static crear(fechaCita: string): FechaCita {
        if (fechaCita == null || fechaCita == undefined) {
            throw new FechaVacio("La fecha de la cita no puede estar vacia");
        }
        return new FechaCita(fechaCita);
    }
}