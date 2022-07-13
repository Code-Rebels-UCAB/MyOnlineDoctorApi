import { IValueObject } from "interfaceVO";
import { DuracionInvalida } from "../excepciones/DuracionInvalida";
import { DuracionVacia } from "../excepciones/DuracionVacia";

export class Duracion implements IValueObject {
    
    constructor(private readonly _duracion: number) {}

    public get duracion(): number {
        return this._duracion;
    }

    public esIgual(duracion: Duracion): boolean {
        return this._duracion == duracion.duracion;
    }

    public static crear(duracion: number): Duracion {
        if (duracion == null || duracion == undefined) {
            throw new DuracionVacia("La duracion no puede estar vacia");
        }

        if ((duracion < 1 ) && (duracion > 2)) {
            throw new DuracionInvalida("La duracion tiene que estar entre 1 y 2 horas");
        }

        return new Duracion(duracion);
    }
}