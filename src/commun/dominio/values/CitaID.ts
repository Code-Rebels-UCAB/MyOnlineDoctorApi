import { IValueObject } from "interfaceVO";
import { Guid } from "guid-typescript";

export class CitaID implements IValueObject {
    private readonly id: Guid;

    private constructor(id: Guid) {
        this.id = id;
    }

    public getCitaID() {
        return this.id;
    }

    public esIgual(citaID: CitaID): boolean {
        return this.id == citaID.getCitaID();
    }

    
    public static crear(id?: Guid){
        if (id) {
        return new CitaID(id);
        }
        return new CitaID(Guid.create());
    }
}