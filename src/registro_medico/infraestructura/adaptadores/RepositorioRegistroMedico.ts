import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRepositorioRegistroMedico } from '../../../registro_medico/aplicacion/puertos/IRepositorioRegistroMedico';
import { RegistroMedicoDTO } from '../../aplicacion/dto/RegistroMedicoDTO';
import { RegistroMedicoORM } from '../persistencia/RegistroMedico.orm';
import { HistoriaMedicaORM } from '../../../historia_medica/infraestructura/persistencia/HistoriaMedica.orm';
import { CitaORM } from '../../../cita/infraestructura/persistencia/Cita.orm';
import { DoctorORM } from '../../../doctor/infraestructura/persistencia/Doctor.orm';
import { RegistroMedicoRespuestaDTO } from '../../aplicacion/dto/RegistroMedicoRespuestaDTO';



@Injectable()
export class RepositorioRegistroMedico implements IRepositorioRegistroMedico {

    constructor(
        @InjectRepository(RegistroMedicoORM)
        private readonly registroMedicoRepository: Repository<RegistroMedicoORM>,
        @InjectRepository(HistoriaMedicaORM)
        private readonly historiaMedicaRepository: Repository<HistoriaMedicaORM>,
        @InjectRepository(CitaORM)
        private readonly citaRepository: Repository<CitaORM>,
        @InjectRepository(DoctorORM)
        private readonly doctorRepository: Repository<DoctorORM>
    ) { }

    async CrearRegistro(datos: RegistroMedicoDTO) {

      const Cita = await this.citaRepository.findOneBy({
        id_cita: datos.IdCita
      });

      const Doctor = await this.doctorRepository.findOneBy({
        id_doctor: datos.IdDoctor
      });

      const RegistroMedicoCreado = await this.registroMedicoRepository.insert(
        {
          id_registro:datos.IdRegistroMedico,
          examenes:datos.examenes,
          historia:datos.historia,
          prescripcion:datos.prescripcion,
          plan:datos.plan,
          diagonistico: datos.diagnostico,
          motivo: Cita.motivo,
          fechaCita: Cita.fechacita,
          doctor: Doctor,
          cita:Cita,
          historiaMedica: this.historiaMedicaRepository.create({id_historia: datos.IdHistoriaMedica})
        }
      )

        return RegistroMedicoCreado;

    }


    async ObtenerHistoriaMedicaAsociada(CitaId: string) {

      const pacienteId = await this.ObtenerPacienteAsociado(CitaId);


      const HistoriaMedica = await this.historiaMedicaRepository
        .createQueryBuilder('historia')
        .where('historia.id_paciente = :id', {
          id: pacienteId,
        })
        .select(['historia.id_historia'])
        .getOne();
      
      if (HistoriaMedica) {
        return HistoriaMedica.id_historia;
      }
      return HistoriaMedica;
    }

  
    async ObtenerPacienteAsociado(CitaId: string) {

      const Cita = await this.citaRepository
        .createQueryBuilder('cita')
        .leftJoinAndSelect('cita.paciente', 'paciente')
        .where('cita.id_cita = :id', {
          id: CitaId,
        })
        .select([
          'cita.id_cita',
          'paciente.id_paciente'])
        .getOne();

        return Cita.paciente.id_paciente;
    }

    async ObtenerRegistroMedicobyID(RegistroMedicoId: string) {
      const RegistroMedico = await this.registroMedicoRepository.findOne({
        relations: {doctor: true},
        where: { id_registro: RegistroMedicoId }
      })
      return RegistroMedico;
    }

    async actualizarRegistroMedico(datos: RegistroMedicoRespuestaDTO){
      await this.registroMedicoRepository.createQueryBuilder()
      .update(RegistroMedicoORM)
      .set({examenes: datos.examenes, historia: datos.historia, prescripcion: datos.prescripcion, plan: datos.plan, diagonistico: datos.diagnostico})
      .where('id_registro = :id', {id: datos.id_registro}).execute();
    }
    
    async ObtenerCitaAsociada(RegistroId: string){
      
      const RegistroC = await this.registroMedicoRepository.createQueryBuilder('registro')
      .leftJoinAndSelect('registro.cita', 'citas')
      .where('registro.id_registro = :id', {
        id: RegistroId,
      })
      .select([
        'registro.id_registro',
        'citas.id_cita'])
      .getOne();
      return RegistroC.cita.id_cita;
    }
}

