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

  async obtenerPacienteById(id: string): Promise<PacienteORM> {
    const paciente:PacienteORM = await this.repositorioPaciente.findOne({
        where: { id_paciente: id },
    });
    return paciente;
  }
}
