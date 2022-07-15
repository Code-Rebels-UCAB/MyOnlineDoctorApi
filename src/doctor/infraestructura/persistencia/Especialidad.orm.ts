
import {Entity, PrimaryColumn, Column, ManyToMany, JoinTable} from 'typeorm'; 
import { DoctorORM } from './Doctor.orm';

@Entity({name: 'especialidades'})
export class EspecialidadORM {
    @PrimaryColumn({name: 'id_especialidad', type: 'varchar'})
    id_especialidad: string;

    @Column({name: 'nombre', type: 'varchar'})
    nombre: string;

    @ManyToMany( () => DoctorORM, doctor => doctor.especialidades)
    @JoinTable({
        name: 'd_e',
        joinColumn: {name: 'id_especialidad', referencedColumnName: 'id_especialidad'},
        inverseJoinColumn: {name: 'id_doctor', referencedColumnName: 'id_doctor'}
    })
    doctores: DoctorORM[];

}