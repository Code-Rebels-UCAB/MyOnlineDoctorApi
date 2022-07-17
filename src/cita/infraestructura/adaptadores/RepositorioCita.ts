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
    const listaCitas = await this.RepositorioCita.find({
      where: {
        id_cita: id_cita,
      },
    });

    return listaCitas;
  }

  obtenerCitaByDoctor(id_doctor: string) {
    throw new Error('Method not implemented');
  }

  obtenerCitaByPaciente(id_paciente: string) {
    throw new Error('Method not implemented');
  }

  obtenerCitaByFecha(fecha: string) {
    throw new Error('Method not implemented');
  }

  crearCita() {
    throw new Error('Method not implemented');
  }

  actualizarStatusCita() {
    throw new Error('Method not implemented');
  }
}
