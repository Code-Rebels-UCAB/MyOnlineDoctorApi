import { RegistroMedico } from "src/registro_medico/dominio/entidades/RegistroMedico";
import { HistoriaMedicaID } from "../values/HisotriaMedicaID";
import { PacienteID } from "../values/PacienteID";
import { RegistroMedicoID } from "../values/RegistroMedicoID";

export class HistoriaMedica{
    constructor(
        private id: HistoriaMedicaID,
        private id_paciente: PacienteID,
        private RegistrosMedicos: RegistroMedicoID[]
    ) {}

    public getHistoriaMedicaID(): HistoriaMedicaID{
        return this.id;
    }

    public getPacienteID(): PacienteID{
        return this.id_paciente;
    }

    public getRegistrosMedicos(): RegistroMedicoID[]{
        return this.RegistrosMedicos;
    }
      
    

}