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

  @Column()
  statuscita: string;

  @Column()
  modalidad: string;

  @Column()
  motivo: string;

  @Column({ type: 'date' })
  fechacita: Date;

  @Column({ type: 'time without time zone' })
  horacita: Date;

  @Column()
  duracion: number;

  @Column({name: 'tokenA', type: 'varchar', nullable: true})
  tokenA: string;
  
  @Column({name: 'channelA', type: 'varchar', nullable: true})
  channelA: string;

  //Relacion Con Paciente
  @ManyToOne(() => PacienteORM, (paciente) => paciente.cita)
  @JoinColumn({ name: 'paciente' })
  paciente: PacienteORM;

  //Relacion Con Doctor
  @ManyToOne(() => DoctorORM, (doctor) => doctor.cita)
  @JoinColumn({ name: 'doctor' })
  doctor: DoctorORM;

  //Relacion Con Registro Medico
  @OneToMany(() => RegistroMedicoORM, (registro) => registro.cita)
  registroMedico: RegistroMedicoORM[];
}
