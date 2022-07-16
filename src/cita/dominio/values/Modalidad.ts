import { IValueObject } from "interfaceVO";
import { TipoModalidad } from "./TipoModalidad";

export class Modalidad  implements IValueObject {

    constructor(private readonly _modalidad: TipoModalidad) {
    }

    public get modalidad() {
        return this._modalidad;
    }

    public esIgual(modalidad: Modalidad): boolean {
        return this._modalidad == modalidad.modalidad;
    }

    public static crear(modalidad: TipoModalidad): Modalidad {
        return new Modalidad(modalidad);
    }
}

