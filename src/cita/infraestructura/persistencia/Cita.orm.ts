import { PacienteORM } from 'src/paciente/infraestructura/persistencia/Paciente.orm';
import { DoctorORM } from 'src/doctor/infraestructura/persistencia/Doctor.orm';
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity({ name: 'citas' })
export class CitaORM {
    @PrimaryColumn()
    id_cita: string;

    @Column()
    statuscita: string;

    @Column()
    modalidad: string;

    @Column()
    motivo: string;


    @Column()
    fechacita: Date;

    @Column({ type: 'timestamptz' })
    horacita: Date;

    @Column()
    duracion: number;

    @OneToOne(() => PacienteORM)
    @JoinColumn({
        name: 'id_paciente'
    })
    paciente: PacienteORM;

    @OneToOne(() => DoctorORM)
    @JoinColumn({
        name: 'id_doctor'
    })
    doctor: DoctorORM;

}