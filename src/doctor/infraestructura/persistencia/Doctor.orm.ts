
import { CitaORM } from '../../../cita/infraestructura/persistencia/Cita.orm';
import { RegistroMedicoORM } from '../../../registro_medico/infraestructura/persistencia/RegistroMedico.orm';
import {Entity, PrimaryColumn, Column, ManyToMany, OneToMany} from 'typeorm'; 
import { EspecialidadORM } from './Especialidad.orm';

@Entity({name: 'doctores'})
export class DoctorORM{

    @PrimaryColumn({name: 'id_doctor', type: 'varchar'})
    id_doctor: string;

    @Column({name: 'p_nombre', type: 'varchar', nullable: true})
    p_nombre: string;

    @Column({name: 'p_apellido', type: 'varchar', nullable: true})
    p_apellido: string;

    @Column({name: 'sexo', type: 'varchar', length:1, nullable: true})
    sexo: string;

    @Column({name: 'correo', type: 'varchar', nullable: true})
    correo: string;

    @Column({name: 'password', type: 'varchar', nullable: true})
    password: string;

    @Column({name: 'latitud', type: 'varchar', nullable: true})
    latitud: string;

    @Column({name: 'longitud', type: 'varchar', nullable: true})
    longitud: string;

    @Column({name: 'foto', type: 'varchar', nullable: true})
    foto: string;

    @Column({name: 'calificacion', type: 'numeric', nullable: true})
    calificacion: number;

    @Column({name: 'cantidad_calificacion', type: 'numeric', nullable: true})
    cantidad_calificacion: number;

    @Column({name: 'status', type: 'varchar', nullable: true})
    status: string;

    @Column({name: 'tokenF', type: 'varchar', nullable: true})
    tokenF: string;

    @ManyToMany(() => EspecialidadORM, especialidad => especialidad.doctores)
    especialidades: EspecialidadORM[];

     //Relacion con cita
    @OneToMany(() => CitaORM, cita => cita.doctor)
    cita: CitaORM[];

    //Relacion con Registro Medico
    @OneToMany(() => RegistroMedicoORM, registroMedico => registroMedico.doctor)
    registroMedico: RegistroMedicoORM[];
}