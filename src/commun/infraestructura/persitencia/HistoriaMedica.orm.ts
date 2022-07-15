import { PacienteORM } from "src/paciente/infraestructura/persistencia/Paciente.orm"
import { RegistroMedicoORM } from "src/registro_medico/infraestructura/persistencia/RegistroMedico.orm"
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm"


@Entity('Historia_Medica')
export class HistoriaMedicaORM {
    @PrimaryColumn({name:'id_historia', type:'varchar'})
    id_historia: string


    @OneToOne(() => PacienteORM)
    @JoinColumn({name:'id_paciente'})
    id_paciente: string


    @OneToMany(() => RegistroMedicoORM, (RegistroMedico) => RegistroMedico.fk_historia)
    id_registro_medicos: string[]



}