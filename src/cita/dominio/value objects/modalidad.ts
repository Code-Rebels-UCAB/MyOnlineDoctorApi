import { IValueObject } from "interfaceVO";

enum TipoModalidad{
    Presencial,
    Virtual
}

class modalidad implements IValueObject{
    
    private readonly tipoModalidad: TipoModalidad


    constructor(tipoModalidad: TipoModalidad){this.tipoModalidad = tipoModalidad;}


    esIgual(valueObject: modalidad): boolean {
        if (valueObject.tipoModalidad == this.tipoModalidad) {
            return true
        }
        return false;
    }

    getModalidad(): TipoModalidad{
        return this.tipoModalidad;
    } 


}