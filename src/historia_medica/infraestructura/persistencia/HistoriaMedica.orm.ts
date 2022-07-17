import { PacienteORM } from "../../../paciente/infraestructura/persistencia/Paciente.orm";
import { RegistroMedicoORM } from "../../../registro_medico/infraestructura/persistencia/RegistroMedico.orm";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm"


@Entity('Historia_Medica')
export class HistoriaMedicaORM {
    @PrimaryColumn({name:'id_historia', type:'varchar'})
    id_historia: string

    //Relacion con Paciente
    @OneToOne(() => PacienteORM, paciente => paciente.historiaMedica)
    @JoinColumn({name:'id_paciente'})
    paciente: PacienteORM

    //Relacion con RegistroMedico
    @OneToMany(() => RegistroMedicoORM, (RegistroMedico) => RegistroMedico.historiaMedica)
    registroMedico: RegistroMedicoORM[]



}