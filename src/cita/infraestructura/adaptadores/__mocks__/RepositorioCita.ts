import { InjectRepository } from "@nestjs/typeorm";
import { IRepositorioCita } from "../../../aplicacion/puertos/IRepositorioCita";
import { Repository } from "typeorm";
import { DoctorORM } from "../../../../doctor/infraestructura/persistencia/Doctor.orm";
import { PacienteORM } from "../../../../paciente/infraestructura/persistencia/Paciente.orm";
import { CitaORM } from "../../persistencia/Cita.orm";
import { SolicitarCitaPersistenciaDTO } from "../../persistencia/SolicitarCitaPersistenciaDTO";


const Citas = [
    {
      id_cita: 'a42253d2-69bd-4136-8ee4-62ce9f84ea31',
      statuscita: 'Solicitada',
      modalidad: 'Virtual',
      motivo:'Dolor de Cabello',
      fechacita: null,
      horacita: null,
      duracion: null,
      doctor:'0462d106-df70-4f8d-b322-0c736f4069e7',
      paciente: 'ed649257-8091-4b77-827a-8532b5c4c826',

    },
]


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
        throw new Error("Method not implemented.");
    }
    obtenerCitaById(id_cita: string) {
        throw new Error("Method not implemented.");
    }
    obtenerCitaByDoctor(id_doctor: string) {
        throw new Error("Method not implemented.");
    }
    obtenerCitaByPaciente(id_paciente: string) {
        throw new Error("Method not implemented.");
    }
    obtenerCitaByFecha(fecha: string) {
        throw new Error("Method not implemented.");
    }
    obtenerCitaDeDoctorByStatus(status: string, doctorid: string) {
        throw new Error("Method not implemented.");
    }
    obtenerCitasDeDoctor(doctorid: string) {
        throw new Error("Method not implemented.");
    }
    obtenerCitasDelDiaDoctor(doctorId: string) {
        throw new Error("Method not implemented.");
    }
    obtenerCantidadPacientesPorDoctor(doctorId: string) {
        throw new Error("Method not implemented.");
    }
    obtenerCantidadCitasDelDiaDoctor(doctorId: string) {
        throw new Error("Method not implemented.");
    }
    obtenerCitaIniciada(citaid: string) {
        throw new Error("Method not implemented.");
    }
    obtenerTokenF(citaid: string) {
        throw new Error("Method not implemented.");
    }
    obtenerDoctorCita(citaid: string) {
        throw new Error("Method not implemented.");
    }
    crearCita(cita: SolicitarCitaPersistenciaDTO) {
        throw new Error("Method not implemented.");
    }
    actualizarStatusCita(citaid: string, status: string) {
        throw new Error("Method not implemented.");
    }
    async actualizarCitaAgendada(citaid: string, fecha: string, hora: string, duracion: string) {
        Citas.forEach( (cita) => {
            if (cita.id_cita == citaid) {
                cita.fechacita = fecha;
                cita.horacita = hora;
                cita.duracion = duracion;
            }
            });
    }
    actualizarDatosVideollamadaCita(citaid: string, nombreCanal: string, tokenCita: string) {
        throw new Error("Method not implemented.");
    }


    
    }