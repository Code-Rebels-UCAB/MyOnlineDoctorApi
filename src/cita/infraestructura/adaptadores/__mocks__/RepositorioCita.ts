import { InjectRepository } from '@nestjs/typeorm';
import { IRepositorioCita } from '../../../aplicacion/puertos/IRepositorioCita';
import { Repository } from 'typeorm';
import { DoctorORM } from '../../../../doctor/infraestructura/persistencia/Doctor.orm';
import { PacienteORM } from '../../../../paciente/infraestructura/persistencia/Paciente.orm';
import { CitaORM } from '../../persistencia/Cita.orm';
import { SolicitarCitaPersistenciaDTO } from '../../persistencia/SolicitarCitaPersistenciaDTO';

const Citas = [
  {
    id_cita: 'a42253d2-69bd-4136-8ee4-62ce9f84ea31',
    statuscita: 'Solicitada',
    modalidad: 'Virtual',
    motivo: 'Dolor de Cabello',
    fechacita: null,
    horacita: null,
    duracion: null,
    doctor: '0462d106-df70-4f8d-b322-0c736f4069e7',
    paciente: 'ed649257-8091-4b77-827a-8532b5c4c826',
  },
  {
    id_cita: '0d8d0a1e-742b-476e-93f9-aaab325fc1c6',
    statuscita: 'Agendada',
    modalidad: 'Virtual',
    motivo: 'Dolor de Cabello',
    fechacita: new Date().toISOString().split('T')[0],
    horacita: null,
    duracion: null,
    doctor: '0c8aa290-d11c-4d47-8e38-6606a03f434a',
    paciente: 'ed649257-8091-4b77-827a-8532b5c4c826',
  },
];

export class RepositorioCita implements IRepositorioCita {
  constructor(
    @InjectRepository(CitaORM)
    private readonly RepositorioCita: Repository<CitaORM>,
    @InjectRepository(DoctorORM)
    private readonly RepositorioDoctor: Repository<DoctorORM>,
    @InjectRepository(PacienteORM)
    private readonly RepositorioPaciente: Repository<PacienteORM>,
  ) {}

  obtenerTodasLasCitas() {
    throw new Error('Method not implemented.');
  }
  obtenerCitaById(id_cita: string) {
    throw new Error('Method not implemented.');
  }
  obtenerCitaByDoctor(id_doctor: string) {
    throw new Error('Method not implemented.');
  }
  obtenerCitaByPaciente(id_paciente: string) {
    throw new Error('Method not implemented.');
  }
  obtenerCitaByFecha(fecha: string) {
    throw new Error('Method not implemented.');
  }
  obtenerCitaDeDoctorByStatus(status: string, doctorid: string) {
    throw new Error('Method not implemented.');
  }
  obtenerCitasDeDoctor(doctorid: string) {
    throw new Error('Method not implemented.');
  }
  obtenerCitasDelDiaDoctor(doctorId: string) {
    throw new Error('Method not implemented.');
  }
  obtenerCantidadPacientesPorDoctor(doctorId: string) {
    const filtro = Citas.filter((cita) => cita.doctor == doctorId);

    return filtro.length;
  }
  obtenerCantidadCitasDelDiaDoctor(doctorId: string) {
    return Citas.filter(
      (cita) =>
        cita.fechacita == new Date().toISOString().split('T')[0] &&
        doctorId == cita.doctor,
    ).length;
  }
  obtenerCitaIniciada(citaid: string) {
    throw new Error('Method not implemented.');
  }
  obtenerTokenF(citaid: string) {
    throw new Error('Method not implemented.');
  }
  obtenerDoctorCita(citaid: string) {
    throw new Error('Method not implemented.');
  }
  crearCita(cita: SolicitarCitaPersistenciaDTO) {
    throw new Error('Method not implemented.');
  }
  actualizarStatusCita(citaid: string, status: string) {
    throw new Error('Method not implemented.');
  }
  async actualizarCitaAgendada(
    citaid: string,
    fecha: string,
    hora: string,
    duracion: string,
  ) {
    Citas.forEach((cita) => {
      if (cita.id_cita == citaid) {
        cita.fechacita = fecha;
        cita.horacita = hora;
        cita.duracion = duracion;
        cita.statuscita = 'Agendada';
      }
    });
  }
  actualizarDatosVideollamadaCita(
    citaid: string,
    nombreCanal: string,
    tokenCita: string,
  ) {
    throw new Error('Method not implemented.');
  }
}
