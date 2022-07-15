import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { DoctorORM } from '../../../doctor/infraestructura/persistencia/Doctor.orm';
import { CitaORM } from '../../../cita/infraestructura/persistencia/Cita.orm';
import { HistoriaMedicaORM } from 'src/commun/infraestructura/persitencia/HistoriaMedica.orm';

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

  @OneToOne(() => DoctorORM)
  @JoinColumn({ name: 'id_doctor' })
  doctor: DoctorORM;

  @OneToOne(() => CitaORM)
  @JoinColumn({ name: 'id_cita' })
  cita: CitaORM;

  @ManyToOne(() => HistoriaMedicaORM, (HistoriaMedica) => HistoriaMedica.id_registro_medicos)
  fk_historia: string
}
