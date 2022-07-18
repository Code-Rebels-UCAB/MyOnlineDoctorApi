import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRepositorioPaciente } from '../../aplicacion/puertos/IRepositorioPaciente';
import { PacienteORM } from '../persistencia/Paciente.orm';

@Injectable()
export class RepositorioPaciente implements IRepositorioPaciente {
  constructor(
    @InjectRepository(PacienteORM)
    private readonly repositorioPaciente: Repository<PacienteORM>,
  ) {}

  async obtenerCantidadTotalPacientes() {
    const pacientes = await this.repositorioPaciente
      .createQueryBuilder('pacientes')
      .select('pacientes.id_paciente')
      .getMany();

    const totalPacientes = pacientes.length;

    return totalPacientes;
  }

  async guardarTokenPaciente(pacienteid: string, tokenPaciente: string) {
    await this.repositorioPaciente.createQueryBuilder('pacientes')
    .update(PacienteORM)
    .set({tokenF: tokenPaciente})
    .where('id_paciente = :id', {
      id: pacienteid,
    }).execute();
  }
}
