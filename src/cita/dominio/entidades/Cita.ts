import { Agregado } from "src/commun/dominio/entidades/Agregado";
import { CitaID } from "../../../commun/dominio/values/CitaID";
import { DoctorID } from "../../../commun/dominio/values/DoctorID";
import { PacienteID } from "../../../commun/dominio/values/PacienteID";
import { Duracion } from "../values/Duracion";
import { FechaCita } from "../values/FechaCita";
import { HoraCita } from "../values/HoraCita";
import { Modalidad } from "../values/Modalidad";
import { Motivo } from "../values/Motivo";
import { StatusCita } from "../values/StatusCita";


export class Cita extends Agregado<CitaID> {


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

    
    //METODOS ADICIONALES
    esIgual(entidad: Cita): boolean {
        return this.id.getCitaID() == entidad.id.getCitaID();
    }
    
}


