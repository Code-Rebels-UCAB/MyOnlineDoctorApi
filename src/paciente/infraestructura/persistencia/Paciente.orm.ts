import { CitaORM } from '../../../cita/infraestructura/persistencia/Cita.orm';
import { HistoriaMedicaORM } from '../../../historia_medica/infraestructura/persistencia/HistoriaMedica.orm';
import {Entity, PrimaryColumn, Column, ManyToOne, OneToMany, OneToOne} from 'typeorm';

@Entity({name: 'pacientes'})
export class PacienteORM{
    
    @PrimaryColumn({name: 'id_paciente', type: 'varchar'})
    id_paciente: string;

    @Column({name: 'p_nombre', type: 'varchar'})
    p_nombre: string;

    @Column({name: 's_nombre', type: 'varchar', nullable: true})
    s_nombre: string;

    @Column({name: 'p_apellido', type: 'varchar'})
    p_apellido: string;

    @Column({name: 's_apellido', type: 'varchar'})
    s_apellido: string;

    @Column({name: 'sexo', type: 'varchar', length: 1})
    sexo: string;

    @Column({name: 'altura', type: 'numeric'})
    altura: number;

    @Column({name: 'peso', type: 'numeric'})
    peso: number;

    @Column({name: 'telefono', type: 'varchar'})
    telefono: string;

    @Column({name: 'antecedentes', type: 'varchar', nullable: true})
    antecedentes: string;
    
    @Column({name: 'operacion', type: 'varchar', nullable: true})
    operacion: string;

    @Column({name: 'statusSuscripccion', type: 'varchar', nullable: true})
    status_suscripcion: string;

    @Column({name: 'alergia', type: 'varchar', nullable: true})
    alergia: string;

    @Column({name: 'contrasena', type: 'varchar', nullable: true})
    contrasena: string;

    @Column({name: 'correo', type: 'varchar', nullable: true})
    correo: string;

    @Column({name: 'fecha_nacimiento', type: 'date', nullable: true})
    fecha_nacimiento: Date;

    @Column({name: 'tokenF', type: 'varchar', nullable: true})
    tokenF: string;


    //Relacion con cita
    @OneToMany(() => CitaORM, cita => cita.paciente)
    cita: CitaORM[];

    @OneToOne(() => HistoriaMedicaORM, historiaMedica => historiaMedica.paciente, { nullable: true })
    historiaMedica: HistoriaMedicaORM;

}