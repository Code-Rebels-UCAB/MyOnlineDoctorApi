import { IValueObject } from "interfaceVO";


export class Plan implements IValueObject{
    constructor (private readonly _plan: string ) {}
    
    public get plan() : string {
        return this._plan;
    }

    public esIgual(plan: Plan): boolean {        
        return this._plan == plan.plan
    }
    
}
