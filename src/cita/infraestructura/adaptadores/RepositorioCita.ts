import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRepositorioCita } from '../../aplicacion/puertos/IRepositorioCita';
import { CitaORM } from '../persistencia/Cita.orm';
import { Repository } from 'typeorm';

@Injectable()
export class RepositorioCita implements IRepositorioCita {
  constructor(
    @InjectRepository(CitaORM)
    private readonly RepositorioCita: Repository<CitaORM>,
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
        'citas.horacita',
        'paciente.id_paciente',
        'doctor.id_doctor',
        'doctor.p_nombre',
        'doctor.p_apellido',
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

  actualizarCitaAgendada(citaid: string,fecha: string, hora: string) {
    const citas = this.RepositorioCita.createQueryBuilder('citas')
    .update(CitaORM)
    .set({fechacita: fecha, horacita: hora})
    .where('citas.id_cita = :id', {
      id: citaid,
    })
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

  crearCita() {
    throw new Error('Method not implemented');
  }

  actualizarStatusCita() {
    throw new Error('Method not implemented');
  }
}
