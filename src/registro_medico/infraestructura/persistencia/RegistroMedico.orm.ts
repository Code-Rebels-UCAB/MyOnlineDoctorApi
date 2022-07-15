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
import { HistoriaMedicaORM } from 'src/historia_medica/infraestructura/persistencia/HistoriaMedica.orm';

@Entity({ name: 'Registros_Medicos' })
export class RegistroMedicoORM {
  @PrimaryColumn()
  id_registro: string;

  @Column()
  examenes: string;

  @Column()
  historia: string;

  @Column()
  prescripcion: string;

  @Column()
  plan: string;

  @Column()
  diagonistico: string;

  @Column()
  motivo: string;

  @Column()
  fechaCita: Date;

  //Relacion con Doctor
  @ManyToOne(() => DoctorORM, doctor => doctor.registroMedico)
  @JoinColumn({name:'doctor'})
  doctor: DoctorORM;

  //Relacion con Cita
  @ManyToOne(() => CitaORM, cita => cita.registroMedico)
  @JoinColumn({name:'cita'})
  cita: CitaORM;

  //Relacion con Historia Medica
  @ManyToOne(() => HistoriaMedicaORM, (HistoriaMedica) => HistoriaMedica.registroMedico)
  @JoinColumn({name:'historiaMedica'})  
  historiaMedica: HistoriaMedicaORM;

}
