import { Calificacion } from '../values/Calificacion';
import { CorreoDoctor } from '../values/CorreoDoctor';
import { DoctorID } from '../../../commun/dominio/values/DoctorID';
import { Especialidad } from '../values/Especialidad';
import { GeneroDoctor } from '../values/GeneroDoctor';
import { NombreCompletoDoctor } from '../values/NombreDoctor';
import { PasswordDoctor } from '../values/PasswordDoctor';
import { Ubicacion } from '../values/Ubicacion';

export class Doctor {
  private constructor(
    private especialidad: Especialidad,
    private calificacion: Calificacion,
    private ubicacion: Ubicacion,
    private generoDoctor: GeneroDoctor,
    private correoDoctor: CorreoDoctor,
    private passwordDoctor: PasswordDoctor,
    private nombreDoctor: NombreCompletoDoctor,
    private doctorid: DoctorID,
  ) {}

  public getEspecialidad(): Especialidad {
    return this.especialidad;
  }
  public setEspecialidad(value: Especialidad) {
    this.especialidad = value;
  }
  public getDoctorid(): DoctorID {
    return this.doctorid;
  }
  public getCalificacion(): Calificacion {
    return this.calificacion;
  }
  public setCalificacion(value: Calificacion) {
    this.calificacion = value;
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
}