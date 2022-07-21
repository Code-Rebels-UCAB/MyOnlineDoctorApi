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


    constructor( 
        private readonly id: CitaID,
        private status?: StatusCita,
        private modalidad?: Modalidad,
        private motivo?: Motivo,
        private paciente?: PacienteID,
        private doctor?: DoctorID,
        private fecha?: FechaCita,
        private hora?: HoraCita,
        private duracion?: Duracion

        
    ) {
        super();
        this.id = id;
        this.setDoctor(doctor);
        this.setPaciente(paciente);
        this.setStatus(status);
        this.setModalidad(modalidad);
        this.setMotivo(motivo);
        this.setFecha(fecha);
        this.setHora(hora);
        this.setDuracion(duracion);
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

    
    private setPaciente(paciente: PacienteID): void {
        if (paciente != null && paciente != undefined) {
            this.paciente = paciente;
        }
    }

    private setDoctor(doctor: DoctorID): void {
        if (doctor != null && doctor != undefined) {
            this.doctor = doctor;
        }
    }

    private setModalidad(modalidad: Modalidad): void {
        if (modalidad != null && modalidad != undefined) {
            this.modalidad = modalidad;
        }
    }

    private setMotivo(motivo: Motivo): void {
        if (motivo != null && motivo != undefined) {
            this.motivo = motivo;
        }
    }

    private setStatus(status: StatusCita): void {
        if (status != null && status != undefined) {
            this.status = status;
        }
    }

    private setFecha(fecha: FechaCita): void {
        if (fecha != null && fecha != undefined) {
            this.fecha = fecha;
        }
    }

    private setHora(hora: HoraCita): void { 
        if (hora != null && hora != undefined) {
            this.hora = hora;
        }
    }

    private setDuracion(duracion: Duracion): void {
        if (duracion != null && duracion != undefined) {
            this.duracion = duracion;
        }
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
        const statusCita = StatusCita.crear(TipoCita.Agendada);
        this.setStatus(statusCita);
        this.setFecha(fecha);
        this.setHora(hora);
        this.setDuracion(duracion);


        this.agregarEvento(
            new CitaAgendada(
              this.id.getCitaID().toString(),
              TipoCita.Agendada,
              fecha.fechaCita,
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


