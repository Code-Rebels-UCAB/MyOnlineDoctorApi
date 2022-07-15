import { IValueObject } from "interfaceVO";
import { TipoCita } from "./TipoCita";


export class StatusCita  implements IValueObject {

    constructor(private readonly _statusCita: TipoCita) {
    }

    public get statusCita() {
        return this._statusCita;
    }

    public esIgual(statusCita:StatusCita): boolean {
        return this._statusCita == statusCita.statusCita;
    }

    public static crear(statusCita: TipoCita): StatusCita {
        return new StatusCita(statusCita);
    }
}
