import { Agregado } from "../../../commun/dominio/entidades/Agregado";
import { CitaID } from "../../../commun/dominio/values/CitaID";
import { DoctorID } from "../../../commun/dominio/values/DoctorID";
import { PacienteID } from "../../../commun/dominio/values/PacienteID";
import { Duracion } from "../values/Duracion";
import { FechaCita } from "../values/FechaCita";
import { HoraCita } from "../values/HoraCita";
import { Modalidad } from "../values/Modalidad";
import { Motivo } from "../values/Motivo";
import { StatusCita } from "../values/StatusCita";
import { TipoCita } from "../values/TipoCita";


export interface DatosCita {
    id: CitaID;
    doctor: DoctorID;
    paciente: PacienteID;
    modalidad: Modalidad;
    motivo: Motivo;
    status: StatusCita;
    fecha?: FechaCita;
    hora?: HoraCita;
    duracion?: Duracion;
}


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

        cita.agregarEvento({
            Fecha: new Date(),
            Nombre: "CitaSolicitada",
            Datos: {
                id_cita : cita.obtenerIdentificador(),
                id_paciente : cita.getPaciente(),
                id_doctor : cita.getDoctor(),
            },
        });

        return cita;
        
    }

    public agendarCita (fecha : FechaCita, hora : HoraCita, duracion : Duracion ){
        const statusCita = StatusCita.crear(TipoCita.Aceptada);
        this.setStatus(statusCita);
        this.setFecha(fecha);
        this.setHora(hora);
        this.setDuracion(duracion);

        this.agregarEvento({
            Fecha: new Date(),
            Nombre: "CitaAgendada",
            Datos: {    
                id_cita : this.obtenerIdentificador(),
                id_paciente : this.getPaciente(),
                id_doctor : this.getDoctor(),
            },
        });

    }

    public rechazarCita (){	
        const statusCita = StatusCita.crear(TipoCita.Rechazada);
        this.setStatus(statusCita);

        this.agregarEvento({
            Fecha: new Date(),
            Nombre: "CitaRechazada",
            Datos: {    
                id_cita : this.obtenerIdentificador(),
                id_paciente : this.getPaciente(),
                id_doctor : this.getDoctor(),
            },
        });
    }


    public finalizarCita (){
        const statusCita = StatusCita.crear(TipoCita.Finalizada);
        this.setStatus(statusCita);

        this.agregarEvento({
            Fecha: new Date(),
            Nombre: "CitaFinalizada",
            Datos: {    
                id_cita : this.obtenerIdentificador(),
                id_paciente : this.getPaciente(),
                id_doctor : this.getDoctor(),
            },
        });
    }


    public cancelarCita (){
        const statusCita = StatusCita.crear(TipoCita.Cancelada);
        this.setStatus(statusCita);

        this.agregarEvento({
            Fecha: new Date(),
            Nombre: "CitaCancelada",
            Datos: {    
                id_cita : this.obtenerIdentificador(),
                id_paciente : this.getPaciente(),
                id_doctor : this.getDoctor(),
            },
        });
    }


    public aceptarCita (){
        const statusCita = StatusCita.crear(TipoCita.Aceptada);
        this.setStatus(statusCita);

        this.agregarEvento({
            Fecha: new Date(),
            Nombre: "CitaAceptada",
            Datos: {    
                id_cita : this.obtenerIdentificador(),
                id_paciente : this.getPaciente(),
                id_doctor : this.getDoctor(),
            },
        });
    }

    public iniciarCita (){
        const statusCita = StatusCita.crear(TipoCita.Iniciada);
        this.setStatus(statusCita);

        this.agregarEvento({
            Fecha: new Date(),
            Nombre: "CitaIniciada",
            Datos: {    
                id_cita : this.obtenerIdentificador(),
                id_paciente : this.getPaciente(),
                id_doctor : this.getDoctor(),
            },
        });
    }


    public suspenderCita (){
        const statusCita = StatusCita.crear(TipoCita.Suspendida);
        this.setStatus(statusCita);

        this.agregarEvento({
            Fecha: new Date(),
            Nombre: "CitaSuspendida",
            Datos: {    
                id_cita : this.obtenerIdentificador(),
                id_paciente : this.getPaciente(),
                id_doctor : this.getDoctor(),
            },
        });
    }

    public bloquearCita (){
        const statusCita = StatusCita.crear(TipoCita.Bloqueada);
        this.setStatus(statusCita);

        this.agregarEvento({
            Fecha: new Date(),
            Nombre: "CitaBloqueada",
            Datos: {    
                id_cita : this.obtenerIdentificador(),
                id_paciente : this.getPaciente(),
                id_doctor : this.getDoctor(),
            },
        });
    }


}


