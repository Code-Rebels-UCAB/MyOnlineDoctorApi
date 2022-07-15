
import { CitaORM } from '../../../cita/infraestructura/persistencia/Cita.orm';
import { RegistroMedicoORM } from '../../../registro_medico/infraestructura/persistencia/RegistroMedico.orm';
import {Entity, PrimaryColumn, Column, ManyToMany, OneToMany} from 'typeorm'; 
import { EspecialidadORM } from './Especialidad.orm';

@Entity({name: 'doctores'})
export class DoctorORM{

    @PrimaryColumn({name: 'id_doctor', type: 'varchar'})
    id_doctor: string;

    @Column({name: 'p_nombre', type: 'varchar'})
    p_nombre: string;

    @Column({name: 'p_apellido', type: 'varchar'})
    p_apellido: string;

    @Column({name: 'sexo', type: 'varchar', length:1})
    sexo: string;

    @Column({name: 'correo', type: 'varchar'})
    correo: string;

    @Column({name: 'password', type: 'varchar'})
    password: string;

    @Column({name: 'latitud', type: 'varchar'})
    latitud: string;

    @Column({name: 'longitud', type: 'varchar'})
    longitud: string;

    @Column({name: 'foto', type: 'varchar'})
    foto: string;

    @Column({name: 'calificacion', type: 'numeric'})
    calificacion: number;

    @Column({name: 'cantidad_calificacion', type: 'numeric'})
    cantidad_calificacion: number;

    @Column({name: 'status', type: 'varchar'})
    status: string;

    @ManyToMany(() => EspecialidadORM, especialidad => especialidad.doctores)
    especialidades: EspecialidadORM[];

     //Relacion con cita
    @OneToMany(() => CitaORM, cita => cita.doctor)
    cita: CitaORM[];

    //Relacion con Registro Medico
    @OneToMany(() => RegistroMedicoORM, registroMedico => registroMedico.doctor)
    registroMedico: RegistroMedicoORM[];
}