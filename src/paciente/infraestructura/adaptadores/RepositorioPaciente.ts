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
  
  async obtenerPacienteById(id: string): Promise<PacienteORM> {
    const paciente:PacienteORM = await this.repositorioPaciente.findOne({
        where: { id_paciente: id },
    });
    return paciente;
  }

  async obtenerPacienteByNombreorApellido(nombre: string): Promise<PacienteORM[]> {
    if(nombre !=null || nombre != undefined){
      nombre = nombre.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    }else{
      nombre = '';
    }

    const pacientesFiltrados =  await this.repositorioPaciente.createQueryBuilder('pacientes')
                                                         .where("(pacientes.p_nombre ||' '|| pacientes.p_apellido) like :nombre", { nombre: `%${nombre}%`})
                                                         .getMany(); 
    return pacientesFiltrados;
  }

  async obtenerPacienteByTelefono(telefono: string): Promise<PacienteORM[]> {

    const pacientesFiltrados =  await this.repositorioPaciente.createQueryBuilder('pacientes')
                                                         .where("pacientes.telefono like :telefono", { telefono: `%${telefono}%`})
                                                         .getMany(); 
    return pacientesFiltrados;
  }

  async registrarPaciente(paciente) {
    console.log(paciente)
    await this.repositorioPaciente.save(paciente);
  }

}
