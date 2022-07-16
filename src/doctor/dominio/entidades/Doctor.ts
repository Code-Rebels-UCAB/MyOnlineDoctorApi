import { Calificacion } from '../values/Calificacion';
import { CorreoDoctor } from '../values/CorreoDoctor';
import { DoctorID } from '../../../commun/dominio/values/DoctorID';
import { Especialidad } from '../values/Especialidad';
import { GeneroDoctor } from '../values/GeneroDoctor';
import { NombreCompletoDoctor } from '../values/NombreCompletoDoctor';
import { PasswordDoctor } from '../values/PasswordDoctor';
import { Ubicacion } from '../values/Ubicacion';
import { Agregado } from '../../../commun/dominio/entidades/Agregado';
import { FotoDoctor } from '../values/FotoDoctor';
import { PacienteID } from 'src/commun/dominio/values/PacienteID';
import { StatusDoctor } from '../values/StatusDoctor';
import { DoctorCalificado } from '../eventos/DoctorCalificado';
import { DoctorBloqueado } from '../eventos/DoctorBloqueado';
import { Status } from '../values/Status';

export class Doctor extends Agregado<DoctorID> {
  private constructor(
    private doctorid: DoctorID,
    private nombreDoctor: NombreCompletoDoctor,
    private generoDoctor: GeneroDoctor,
    private correoDoctor: CorreoDoctor,
    private passwordDoctor: PasswordDoctor,
    private calificacion: Calificacion,
    private ubicacion: Ubicacion,
    private fotoDoctor: FotoDoctor,
    private statusDoctor: StatusDoctor,
    private especialidad: Especialidad[],

  ) {
    super();
  }

  public getEspecialidad(): Especialidad[] {
    return this.especialidad;
  }
  public setEspecialidad(value: Especialidad[]) {
    this.especialidad = value;
  }

  public getCalificacion(): Calificacion {
    return this.calificacion;
  }
  public setCalificacion(value: Calificacion) {
    this.calificacion = value;
  }
  public setStatusDoctor(value: StatusDoctor) {
    this.statusDoctor = value;
  }
  public getUbicacion(): Ubicacion {
    return this.ubicacion;
  }
  public setUbicacion(value: Ubicacion) {
    this.ubicacion = value;
  }
  public getGeneroDoctor(): GeneroDoctor {
    return this.generoDoctor;
  }

  public getCorreoDoctor(): CorreoDoctor {
    return this.correoDoctor;
  }

  public getPasswordDoctor(): PasswordDoctor {
    return this.passwordDoctor;
  }

  public getNombreDoctor(): NombreCompletoDoctor {
    return this.nombreDoctor;
  }

  public getfotoDoctor(): FotoDoctor {
    return this.fotoDoctor;
  }

  public getStatusDoctor(): StatusDoctor {
    return this.statusDoctor;
  }

  obtenerIdentificador(): DoctorID {
    return this.doctorid;
  }
  esIgual(entidad: Doctor): boolean {
    return (
      this.doctorid.getDoctorID() ===
      entidad.obtenerIdentificador().getDoctorID()
    );
  }

  //Eventos de Dominio
  public calificarDoctor(
    id_paciente: PacienteID,
    calificacion: Calificacion,
  ): void {
    this.setCalificacion(calificacion);

    this.agregarEvento(
      new DoctorCalificado(
        this.doctorid.getDoctorID().toString(),
        id_paciente.getPacienteID().toString(),
        calificacion.getCalificacion(),
      ),
    );
  }

  public bloquearDoctor(): void {
    this.setStatusDoctor(StatusDoctor.crear(Status.Bloqueado));

    this.agregarEvento(
      new DoctorBloqueado(
        this.doctorid.getDoctorID().toString(),
        this.statusDoctor.getStatus(),
      ),
    );
  }
}
