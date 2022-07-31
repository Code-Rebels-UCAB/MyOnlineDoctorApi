import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoriaMedicaORM } from '../../../historia_medica/infraestructura/persistencia/HistoriaMedica.orm';
import { ConsultarPacienteRespuestaDTO } from '../../../paciente/aplicacion/dto/queries/ConsultarPaciente.query';
import { Repository } from 'typeorm';
import { IRepositorioPaciente } from '../../aplicacion/puertos/IRepositorioPaciente';
import { PacienteORM } from '../persistencia/Paciente.orm';
import * as bcrypt from 'bcrypt';

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

  async buscarDatosIniciarSesionPaciente(pacienteCorreo:string) {
    const datosIniciarSesion = await this.repositorioPaciente.createQueryBuilder('pacientes')
    .where("pacientes.correo = :pacienteCorreo", {pacienteCorreo: `${pacienteCorreo}`})
    .getOne();
    return datosIniciarSesion;
  }

  async registrarPaciente(paciente: ConsultarPacienteRespuestaDTO) {
    const salt = await bcrypt.genSalt();
    const passwordHasheado = await bcrypt.hash(paciente.password, salt);

    const pacienteORM: PacienteORM = {
      id_paciente: paciente.idPaciente,
      p_nombre: paciente.primer_nombre,
      s_nombre: paciente.segundo_nombre,
      p_apellido: paciente.primer_apellido,
      s_apellido: paciente.segundo_apellido,
      fecha_nacimiento: paciente.fechaNacimiento,
      telefono: paciente.telefono,
      correo: paciente.email,
      sexo: paciente.genero,
      altura: paciente.altura,
      peso: paciente.peso,
      contrasena: passwordHasheado,
      status_suscripcion: paciente.statusSuscripcion,
      alergia: paciente.alergia,
      antecedentes: paciente.antecedentes,
      operacion: paciente.operaciones,
      tokenF: '',
      cita: [],
      historiaMedica: new HistoriaMedicaORM()
    };
    return await this.repositorioPaciente.save(pacienteORM);
  }

}
