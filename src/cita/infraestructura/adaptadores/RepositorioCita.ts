import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRepositorioCita } from '../../aplicacion/puertos/IRepositorioCita';
import { CitaORM } from '../persistencia/Cita.orm';
import { Repository } from 'typeorm';
import { SolicitarCitaPersistenciaDTO } from '../persistencia/SolicitarCitaPersistenciaDTO';
import { DoctorORM } from '../../../doctor/infraestructura/persistencia/Doctor.orm';
import { PacienteORM } from '../../../paciente/infraestructura/persistencia/Paciente.orm';
// import { RepositorioDoctor } from '../../../doctor/infraestructura/adaptadores/RepositorioDoctor';

@Injectable()
export class RepositorioCita implements IRepositorioCita {
  constructor(
    @InjectRepository(CitaORM)
    private readonly RepositorioCita: Repository<CitaORM>,
    @InjectRepository(DoctorORM)
    private readonly RepositorioDoctor: Repository<DoctorORM>,
    @InjectRepository(PacienteORM)
    private readonly RepositorioPaciente: Repository<PacienteORM>,
  ) {}

  async obtenerTodasLasCitas() {
    const listaCitas = await this.RepositorioCita.find();

    return listaCitas;
  }

  async obtenerCitaById(id_cita: string) {
    const cita = this.RepositorioCita.createQueryBuilder('citas')
    .leftJoinAndSelect('citas.doctor', 'doctor')
    .leftJoinAndSelect('citas.paciente', 'paciente')
    .where('citas.id_cita = :id', {
      id: id_cita,
    })
    .select([
      'citas.id_cita',
      'citas.statuscita',
      'citas.modalidad',
      'citas.motivo',
      'citas.fechacita',
      'citas.horacita',
      'citas.duracion',
      'doctor.id_doctor',
      'paciente.id_paciente',
    ])
    .getOne();
    return cita;
  }


  async obtenerCitaByDoctor(id_doctor: string) {
    const listaCitas = await this.RepositorioCita.createQueryBuilder('citas')
      .where('citas.doctor = :id', { id: id_doctor })
      .getMany();

    return listaCitas;
  }

  async obtenerCitaByPaciente(id_paciente: string) {
    const listaCitas = await this.RepositorioCita.createQueryBuilder('citas')
      .leftJoinAndSelect('citas.paciente', 'paciente')
      .leftJoinAndSelect('citas.doctor', 'doctor')
      .where('citas.paciente = :id', {
        id: id_paciente,
      })
      .select([
        'citas.id_cita',
        'citas.statuscita',
        'citas.modalidad',
        'citas.fechacita',
        'citas.duracion',
        'citas.horacita',
        'paciente.id_paciente',
        'doctor.id_doctor',
        'doctor.p_nombre',
        'doctor.p_apellido',
        'doctor.sexo'
      ])
      .getMany();

    return listaCitas;
  }

  async obtenerCitaByFecha(fecha: string) {
    const listaCitas = await this.RepositorioCita.createQueryBuilder('citas')
      .where('citas.fechacita = :fecha', { fecha: fecha })
      .getMany();

    return listaCitas;
  }

  async obtenerCitaDeDoctorByStatus(statuscita: string, doctorid: string) {
    const citas = await this.RepositorioCita.createQueryBuilder('citas')
      .leftJoinAndSelect('citas.doctor', 'doctor')
      .leftJoinAndSelect('citas.paciente', 'paciente')
      .where('citas.statuscita = :status AND citas.doctor = :id', {
        status: statuscita,
        id: doctorid,
      })
      .select([
        'citas.id_cita',
        'citas.statuscita',
        'citas.modalidad',
        'citas.motivo',
        'doctor.id_doctor',
        'doctor.p_nombre',
        'doctor.p_apellido',
        'paciente.id_paciente',
        'paciente.p_nombre',
        'paciente.p_apellido',
      ])
      .getMany();

    return citas;
  }

  async obtenerCitasDeDoctor(doctorid: string) {
    const citas = await this.RepositorioCita.createQueryBuilder('citas')
      .leftJoinAndSelect('citas.paciente', 'paciente')
      .where('citas.doctor = :id', {
        id: doctorid,
      })
      .select([
        'citas.id_cita',
        'citas.horacita',
        'citas.modalidad',
        'citas.statuscita',
        'paciente.id_paciente',
        'paciente.p_nombre',
        'paciente.p_apellido',
      ])
      .getMany();

    return citas;
  }
  
  async obtenerCitasDelDiaDoctor(doctorId: string) {
    const citas = await this.RepositorioCita.createQueryBuilder('citas')
    .leftJoinAndSelect('citas.paciente', 'paciente')
    .where('citas.doctor = :id AND citas.fechacita = :fecha', {
      id: doctorId, fecha: new Date().toISOString().split('T')[0]
    })
    .select([
      'citas.id_cita',
      'citas.statuscita',
      'citas.modalidad',
      'citas.motivo',
      'citas.fechacita',
      'citas.horacita',
      'citas.duracion',
      'paciente.id_paciente',
      'paciente.p_nombre',
      'paciente.p_apellido',
    ])
    .getMany();
    return citas;
  }



  async obtenerCantidadPacientesPorDoctor(doctorId: string) {
    const pacientesDoctor = await this.RepositorioCita.createQueryBuilder(
      'citas',
    )
      .distinctOn(['citas.paciente'])
      .where('citas.doctor = :id', { id: doctorId })
      .getMany();

    const cantidadPacientesDoctor = pacientesDoctor.length;

    return cantidadPacientesDoctor;
  }

  async obtenerCantidadCitasDelDiaDoctor(doctorId: string) {
    const citasDiaDoctor = await this.RepositorioCita.createQueryBuilder(
      'citas',
    )
      .where('citas.doctor = :id', { id: doctorId })
      .andWhere('citas.fechacita = :fecha', {
        fecha: new Date().toISOString().split('T')[0],
      })
      .getMany();

    const cantidadCitasDia = citasDiaDoctor.length;

    return cantidadCitasDia;
  }
  
  async crearCita(cita: SolicitarCitaPersistenciaDTO) {
    //obtenemos al doctor por su id
    const doctor = await this.RepositorioDoctor.findOneBy({id_doctor: cita.iddoctor});
    
    //obtenemos al paciente por su id
    const paciente = await this.RepositorioPaciente.findOneBy({id_paciente: cita.idpaciente});

    await this.RepositorioCita.insert({
      id_cita: cita.id_cita,
      statuscita: cita.statuscita,
      modalidad: cita.modalidad,
      motivo: cita.motivo,
      doctor: doctor,
      paciente: paciente,

    });
    return await this.obtenerCitaById(cita.id_cita);
  }

  async actualizarStatusCita(citaid: string, status: string) {
      console.log(citaid)
    //Actualizamos la cita
    await this.RepositorioCita.update({id_cita: citaid},{statuscita: status});

     //Obtenemos la cita actualizada
    let cita = await this.obtenerCitaById(citaid);

    return cita;
  }

  async actualizarCitaAgendada(citaid: string,fecha: string, hora: string, duracion:string) {
    const citas = this.RepositorioCita.createQueryBuilder('citas')
    .update(CitaORM)
    .set({fechacita: fecha, horacita: hora, duracion:Number(duracion), statuscita: 'Agendada'})
    .where('id_cita = :id', {
      id: citaid,
    }).execute();
  }

  async actualizarDatosVideollamadaCita(citaid: string, nombreCanal: string, tokenCita: string) {
    const datosCita = await this.RepositorioCita.createQueryBuilder('citas')
    .update(CitaORM)
    .set({channelA: nombreCanal, tokenA: tokenCita})
    .where('id_cita = :id', {
      id: citaid,
    }).execute();
  }

}



