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

export class Doctor extends Agregado<DoctorID> {
  private constructor(
    private especialidad: Especialidad[],
    private calificacion: Calificacion[],
    private ubicacion: Ubicacion,
    private generoDoctor: GeneroDoctor,
    private correoDoctor: CorreoDoctor,
    private passwordDoctor: PasswordDoctor,
    private nombreDoctor: NombreCompletoDoctor,
    private doctorid: DoctorID,
    private fotoDoctor: FotoDoctor,
    private statusDoctor: StatusDoctor,
  ) {
    super();
  }

  public getEspecialidad(): Especialidad[] {
    return this.especialidad;
  }
  public setEspecialidad(value: Especialidad[]) {
    this.especialidad = value;
  }

  public getCalificacion(): Calificacion[] {
    return this.calificacion;
  }
  public setCalificacion(value: Calificacion) {
    this.calificacion.push(value);
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
  public calificarDoctor(id_paciente: PacienteID, calificacion: Calificacion):void{
    this.setCalificacion(calificacion);
    
    this.agregarEvento({
      Fecha: new Date(),
      Nombre: "DoctorCalificado",
      Datos: {
        id_doctor: this.doctorid.getDoctorID(),
        id_paciente: id_paciente,
        calificacion: calificacion.getCalificacion(),
      }
    });
  }

  public bloquearDoctor():void{
    this.agregarEvento({
      Fecha: new Date(),
      Nombre: "DoctorBloqueado",
      Datos: {
        id_doctor: this.doctorid.getDoctorID(),
      }
    });
  }
}
