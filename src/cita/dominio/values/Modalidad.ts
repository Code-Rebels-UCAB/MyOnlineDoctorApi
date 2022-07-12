import { IValueObject } from "../../../commun/dominio/values/IValueObject"
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
}
