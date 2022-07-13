import { IValueObject } from "interfaceVO";
import { PlanVacio } from "../excepciones/PlanVacio";


export class Plan implements IValueObject{
    private constructor (private readonly _plan: string ) {}
    
    public getPlan() : string {
        return this._plan;
    }

    public esIgual(plan: Plan): boolean {        
        return this._plan == plan.getPlan();
    }
    
    public static crear(_plan: string){
        if(_plan == null || _plan == undefined || _plan == ''){
            throw new PlanVacio('El plan en el registro medico no puede estar vacio');
        }
        return new Plan(_plan);
    }
}
