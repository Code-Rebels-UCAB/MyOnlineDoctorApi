import { HistoriaMedicaID } from "../values/HisotriaMedicaID";
import { PacienteID } from "../values/PacienteID";
import { RegistroMedicoID } from "../values/RegistroMedicoID";
import { Agregado } from "./Agregado";

export class HistoriaMedica extends Agregado<HistoriaMedicaID>{
    
    constructor(
        private readonly id: HistoriaMedicaID,
        private id_paciente: PacienteID,
        private RegistrosMedicos: RegistroMedicoID[]
    ) {
        super();
    }

    public getPacienteID(): PacienteID{
        return this.id_paciente;
    }

    public getRegistrosMedicos(): RegistroMedicoID[]{
        return this.RegistrosMedicos;
    }
    
    obtenerIdentificador(): HistoriaMedicaID {
        return this.id;
    }
    esIgual(entidad: HistoriaMedica): boolean {
        return this.id.getHistoriaMedicaID() === entidad.obtenerIdentificador().getHistoriaMedicaID();
    }
    

}