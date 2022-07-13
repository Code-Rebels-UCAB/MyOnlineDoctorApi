import { IValueObject } from "interfaceVO";
import { Guid } from "guid-typescript";

export class CitaID implements IValueObject {
    private readonly id: Guid;

    private constructor() {
        this.id = Guid.create();
    }

    public getCitaID() {
        return this.id;
    }

    public esIgual(citaID: CitaID): boolean {
        return this.id == citaID.getCitaID();
    }

    public static crear(){
        return new CitaID();
    }
}