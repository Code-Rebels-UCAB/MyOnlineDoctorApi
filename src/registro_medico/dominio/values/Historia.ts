import { IValueObject } from "interfaceVO";


export class Historia implements IValueObject{
    constructor (private readonly _historia: string ) {}
    
    public get historia() : string {
        return this._historia;
    }

    public esIgual(historia: Historia): boolean {        
        return this._historia == historia.historia;
    }
    
}