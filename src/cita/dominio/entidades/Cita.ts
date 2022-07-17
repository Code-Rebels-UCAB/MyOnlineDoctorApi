import { Agregado } from "../../../commun/dominio/entidades/Agregado";
import { CitaID } from "../../../commun/dominio/values/CitaID";
import { DoctorID } from "../../../commun/dominio/values/DoctorID";
import { PacienteID } from "../../../commun/dominio/values/PacienteID";
import { CitaAceptada } from "../eventos/CitaAceptada";
import { CitaAgendada } from "../eventos/CitaAgendada";
import { CitaBloqueada } from "../eventos/CitaBloqueada";
import { CitaCancelada } from "../eventos/CitaCancelada";
import { CitaFinalizada } from "../eventos/CitaFinalizada";
import { CitaIniciada } from "../eventos/CitaIniciada";
import { CitaSolicitada } from "../eventos/CitaSolicitada";
import { CitaSuspendida } from "../eventos/CitaSuspendida";
import { Duracion } from "../values/Duracion";
import { FechaCita } from "../values/FechaCita";
import { HoraCita } from "../values/HoraCita";
import { Modalidad } from "../values/Modalidad";
import { Motivo } from "../values/Motivo";
import { StatusCita } from "../values/StatusCita";
import { TipoCita } from "../values/TipoCita";



export class Cita extends Agregado<CitaID> {


    private constructor( 
        private readonly id: CitaID,
        private status: StatusCita,
        private modalidad: Modalidad,
        private motivo: Motivo,
        private readonly paciente: PacienteID,
        private readonly doctor: DoctorID,
        private fecha?: FechaCita,
        private hora?: HoraCita,
        private duracion?: Duracion

        
    ) {
        super();
    }

    //GETTERS DE VALUE OBJECTS 
    obtenerIdentificador(): CitaID {
        return this.id;
    }

    public getStatus(): StatusCita {
        return this.status;
    }

    public getModalidad(): Modalidad {
        return this.modalidad;
    }

    public getMotivo(): Motivo {
        return this.motivo;
    }

    public getPaciente(): PacienteID {
        return this.paciente;
    }

    public getDoctor(): DoctorID {
        return this.doctor;
    }

    public getFecha(): FechaCita {
        return this.fecha;
    }

    public getHora(): HoraCita {
        return this.hora;
    }

    public getDuracion(): Duracion {
        return this.duracion;
    }

    //setters de value objects

    private setModalidad(modalidad: Modalidad): void {
        this.modalidad = modalidad;
    }

    private setMotivo(motivo: Motivo): void {
        this.motivo = motivo;
    }

    private setStatus(status: StatusCita): void {
        this.status = status;
    }

    private setFecha(fecha: FechaCita): void {
        this.fecha = fecha;
    }

    private setHora(hora: HoraCita): void { 
        this.hora = hora;
    }

    private setDuracion(duracion: Duracion): void {
        this.duracion = duracion;
    }
    
    //METODOS ADICIONALES
    esIgual(entidad: Cita): boolean {
        return this.id.getCitaID() == entidad.obtenerIdentificador().getCitaID();
    }

    public static solicitarCita( modalidad: Modalidad, motivo: Motivo, id_paciente: PacienteID, id_doctor: DoctorID ): Cita {
        
        const id_cita = CitaID.crear()
        const cita = new Cita 
        (id_cita, StatusCita.crear(TipoCita.Solicitada), modalidad, motivo, id_paciente, id_doctor);

        cita.agregarEvento(
          new CitaSolicitada(
            id_doctor.getDoctorID().toString(),
            id_paciente.getPacienteID().toString(),
            id_cita.getCitaID().toString(),
            TipoCita.Solicitada,
            motivo.motivo,
            modalidad.modalidad,
            new Date(),
          ),
        );

        return cita;
        
    }

    public agendarCita (fecha : FechaCita, hora : HoraCita, duracion : Duracion ){
        const statusCita = StatusCita.crear(TipoCita.Aceptada);
        this.setStatus(statusCita);
        this.setFecha(fecha);
        this.setHora(hora);
        this.setDuracion(duracion);

        const id_doctor = this.getDoctor()
        const id_paciente = this.getPaciente()
        const id_cita = this.obtenerIdentificador()

        this.agregarEvento(
            new CitaAgendada(
              id_doctor.getDoctorID().toString(),
              id_paciente.getPacienteID().toString(),
              id_cita.getCitaID().toString(),
              TipoCita.Agendada,
              hora.horaCita,
              duracion.duracion.toString(),
              new Date(),
            ),
          );
    }    

    public finalizarCita (){
        const statusCita = StatusCita.crear(TipoCita.Finalizada);
        this.setStatus(statusCita);

        const id_doctor = this.getDoctor()
        const id_paciente = this.getPaciente()
        const id_cita = this.obtenerIdentificador()

        this.agregarEvento(
            new CitaFinalizada(
                id_doctor.getDoctorID().toString(),
                id_paciente.getPacienteID().toString(),
                id_cita.getCitaID().toString(),
                TipoCita.Finalizada,
                new Date(),
            ),
        );
    }


    public cancelarCita (){
        const statusCita = StatusCita.crear(TipoCita.Cancelada);
        this.setStatus(statusCita);

        const id_doctor = this.getDoctor()
        const id_paciente = this.getPaciente()
        const id_cita = this.obtenerIdentificador()

        this.agregarEvento(
            new CitaCancelada(
                id_doctor.getDoctorID().toString(),
                id_paciente.getPacienteID().toString(),
                id_cita.getCitaID().toString(),
                TipoCita.Cancelada,
                new Date(),
            ),
        );
    }


    public aceptarCita (){
        const statusCita = StatusCita.crear(TipoCita.Aceptada);
        this.setStatus(statusCita);

        const id_doctor = this.getDoctor()
        const id_paciente = this.getPaciente()
        const id_cita = this.obtenerIdentificador()

        this.agregarEvento(
            new CitaAceptada(
                id_doctor.getDoctorID().toString(),
                id_paciente.getPacienteID().toString(),
                id_cita.getCitaID().toString(),
                TipoCita.Aceptada,
                new Date(),
            ),
        );
    }

    public iniciarCita (){
        const statusCita = StatusCita.crear(TipoCita.Iniciada);
        this.setStatus(statusCita);

        const id_doctor = this.getDoctor()
        const id_paciente = this.getPaciente()
        const id_cita = this.obtenerIdentificador()

        this.agregarEvento(
            new CitaIniciada(
                id_doctor.getDoctorID().toString(),
                id_paciente.getPacienteID().toString(),
                id_cita.getCitaID().toString(),
                TipoCita.Iniciada,
                new Date(),
            ),
        );
    }


    public suspenderCita (){
        const statusCita = StatusCita.crear(TipoCita.Suspendida);
        this.setStatus(statusCita);

        const id_doctor = this.getDoctor()
        const id_paciente = this.getPaciente()
        const id_cita = this.obtenerIdentificador()

        this.agregarEvento(
            new CitaSuspendida(
                id_doctor.getDoctorID().toString(),
                id_paciente.getPacienteID().toString(),
                id_cita.getCitaID().toString(),
                TipoCita.Suspendida,
                new Date(),
            ),
        );
    }

    public bloquearCita (){
        const statusCita = StatusCita.crear(TipoCita.Bloqueada);
        this.setStatus(statusCita);

        const id_doctor = this.getDoctor()
        const id_paciente = this.getPaciente()
        const id_cita = this.obtenerIdentificador()

        this.agregarEvento(
            new CitaBloqueada(
                id_doctor.getDoctorID().toString(),
                id_paciente.getPacienteID().toString(),
                id_cita.getCitaID().toString(),
                TipoCita.Bloqueada,
                new Date(),
            ),
        );
    }

    
}


