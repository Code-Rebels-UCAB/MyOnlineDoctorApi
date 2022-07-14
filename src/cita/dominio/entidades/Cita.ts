import { CitaID } from "../../../commun/dominio/values/CitaID";
import { DoctorID } from "../../../commun/dominio/values/DoctorID";
import { PacienteID } from "../../../commun/dominio/values/PacienteID";
import { Duracion } from "../values/Duracion";
import { FechaCita } from "../values/FechaCita";
import { HoraCita } from "../values/HoraCita";
import { Modalidad } from "../values/Modalidad";
import { Motivo } from "../values/Motivo";
import { StatusCita } from "../values/StatusCita";

export interface DatosCita {
    id: CitaID;
    status: StatusCita;
    fecha: FechaCita;
    hora: HoraCita;
    duracion: Duracion;
    modalidad: Modalidad;
    motivo: Motivo;
    paciente: PacienteID;
    doctor: DoctorID;
}

export class Cita {
    

    constructor( 
        private readonly id: CitaID,
        private status: StatusCita,
        private modalidad: Modalidad,
        private motivo: Motivo,
        private readonly paciente: PacienteID,
        private readonly doctor: DoctorID,
        private fecha?: FechaCita,
        private hora?: HoraCita,
        private duracion?: Duracion
    ) {}


    public getId(): CitaID {
        return this.id;
    }

    public setStatus(status: StatusCita): void {
        this.status = status;
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

    public setFecha(fecha: FechaCita): void {
        this.fecha = fecha;
    }

    public getFecha(): FechaCita {
        return this.fecha;
    }

    public setHora(hora: HoraCita): void {
        this.hora = hora;
    }

    public getHora(): HoraCita {
        return this.hora;
    }

    public setDuracion(duracion: Duracion): void {
        this.duracion = duracion;
    }

    public getDuracion(): Duracion {
        return this.duracion;
    }


    public static crear(datos: DatosCita): Cita {
        return new Cita(
            datos.id,
            datos.status,
            datos.modalidad,
            datos.motivo,
            datos.paciente,
            datos.doctor,
            datos.fecha,
            datos.hora,
            datos.duracion
        );
    }


}


