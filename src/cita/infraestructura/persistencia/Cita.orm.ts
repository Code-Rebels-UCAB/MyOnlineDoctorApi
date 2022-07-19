import { PacienteORM } from '../../../paciente/infraestructura/persistencia/Paciente.orm';
import { DoctorORM } from '../../../doctor/infraestructura/persistencia/Doctor.orm';
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { RegistroMedicoORM } from '../../../registro_medico/infraestructura/persistencia/RegistroMedico.orm';

@Entity({ name: 'citas' })
export class CitaORM {
  @PrimaryColumn()
  id_cita: string;

  @Column({nullable: true})
  statuscita: string;

  @Column({nullable: true})
  modalidad: string;

  @Column({nullable: true})
  motivo: string;

  @Column({ type: 'date', nullable: true })
  fechacita: Date;

  @Column({ type: 'time without time zone', nullable: true })
  horacita: Date;

  @Column({nullable: true})
  duracion: number;

  @Column({name: 'tokenA', type: 'varchar', nullable: true})
  tokenA: string;
  
  @Column({name: 'channelA', type: 'varchar', nullable: true})
  channelA: string;

  //Relacion Con Paciente
  @ManyToOne(() => PacienteORM, (paciente) => paciente.cita, { nullable: true })
  @JoinColumn({ name: 'paciente'})
  paciente: PacienteORM;

  //Relacion Con Doctor
  @ManyToOne(() => DoctorORM, (doctor) => doctor.cita, { nullable: true })
  @JoinColumn({ name: 'doctor' })
  doctor: DoctorORM;

  //Relacion Con Registro Medico
  @OneToMany(() => RegistroMedicoORM, (registro) => registro.cita)
  registroMedico: RegistroMedicoORM[];
}
