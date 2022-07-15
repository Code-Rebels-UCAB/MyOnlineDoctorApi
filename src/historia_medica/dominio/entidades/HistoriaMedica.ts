import { HistoriaMedicaID } from "../../../commun/dominio/values/HisotriaMedicaID";
import { PacienteID } from "../../../commun/dominio/values/PacienteID";
import { RegistroMedicoID } from "../../../commun/dominio/values/RegistroMedicoID";
import { Agregado } from "../../../commun/dominio/entidades/Agregado";
import { HistoriaMedicaCreada } from "../eventos/HistoriaMedicaCreada";
import { HistoriaMedicaModificada } from "../eventos/HistoriaMedicaModificada";
export class HistoriaMedica extends Agregado<HistoriaMedicaID>{
    
    private constructor(
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

    public static crearHistoria( id_paciente: PacienteID): HistoriaMedica {
        const id_historia = HistoriaMedicaID.crear();

        const historia = new HistoriaMedica(id_historia, id_paciente, []);

        historia.agregarEvento(
            new HistoriaMedicaCreada(
                id_historia.getHistoriaMedicaID().toString(),
                id_paciente.getPacienteID().toString(),
                new Date(),
            ),
        );

        return historia;
    }


    public modificarHistoriaMedica(id_registro : RegistroMedicoID){
        this.RegistrosMedicos.push(id_registro);

        this.agregarEvento(
            new HistoriaMedicaModificada(
                this.id.getHistoriaMedicaID().toString(),
                this.id_paciente.getPacienteID().toString(),
                id_registro.getRegistroMedicoID().toString(),
                new Date(),
            ),
        );
    }

}