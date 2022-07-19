import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { DoctorORM } from '../../../doctor/infraestructura/persistencia/Doctor.orm';
import { CitaORM } from '../../../cita/infraestructura/persistencia/Cita.orm';
import { HistoriaMedicaORM } from '../../../historia_medica/infraestructura/persistencia/HistoriaMedica.orm';

@Entity({ name: 'Registros_Medicos' })
export class RegistroMedicoORM {
  @PrimaryColumn()
  id_registro: string;

  @Column({ nullable: true })
  examenes: string;

  @Column({ nullable: true })
  historia: string;

  @Column({ nullable: true })
  prescripcion: string;

  @Column({ nullable: true })
  plan: string;

  @Column({ nullable: true })
  diagonistico: string;

  @Column({ nullable: true })
  motivo: string;

  @Column({name: 'fechaCita', type: 'date', nullable: true})
  fechaCita: Date;

  //Relacion con Doctor
  @ManyToOne(() => DoctorORM, doctor => doctor.registroMedico, { nullable: true })
  @JoinColumn({name:'doctor'})
  doctor: DoctorORM;

  //Relacion con Cita
  @ManyToOne(() => CitaORM, cita => cita.registroMedico, { nullable: true })
  @JoinColumn({name:'cita'})
  cita: CitaORM;

  //Relacion con Historia Medica
  @ManyToOne(() => HistoriaMedicaORM, (HistoriaMedica) => HistoriaMedica.registroMedico, { nullable: true })
  @JoinColumn({name:'historiaMedica'})  
  historiaMedica: HistoriaMedicaORM;

}
