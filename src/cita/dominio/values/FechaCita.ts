import { IValueObject } from "interfaceVO";
import { FechaInvalida } from '../../../commun/dominio/excepciones/FechaInvalida';
import { FechaVacio } from "../../../commun/dominio/excepciones/FechaVacio";


export class FechaCita implements IValueObject {
    constructor (private readonly _fechaCita: Date ) {}

    public get fechaCita() : Date {
        return this._fechaCita;
    }

    public esIgual(fechaCita: FechaCita): boolean {
        return this._fechaCita == fechaCita.fechaCita;
    }

    public static crear(fechaCita: Date): FechaCita {
        if (fechaCita == null || fechaCita == undefined) {
            throw new FechaVacio("La fecha de la cita no puede estar vacia");
        }
        else if (!(fechaCita instanceof Date)) {
            throw new FechaInvalida("La fecha ingresada no es valida");
        }
        return new FechaCita(fechaCita);
    }
}