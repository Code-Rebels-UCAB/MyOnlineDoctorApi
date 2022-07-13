import { IValueObject } from "interfaceVO";


export class Examenes implements IValueObject{
    constructor (private readonly _examenes: string ) {}
    
    public get examenes() : string {
        return this._examenes;
    }

    public esIgual(examenes: Examenes): boolean {        
        return this._examenes == examenes.examenes;
    }
    
}
