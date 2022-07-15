import { PacienteID } from '../../../commun/dominio/values/PacienteID';
import { GeneroPaciente } from '../values/GeneroPaciente';
import { Altura } from '../values/Altura';
import { Peso } from '../values/Peso';
import { NumeroTelefonico } from '../values/NumeroTelefonico';
import { Antecedentes } from '../values/Antecedentes';
import { Operacion } from '../values/Operacion';
import { StatusSuscripcion } from '../values/StatusSuscripcion';
import { Alergia } from '../values/Alergia';
import { PasswordPaciente } from '../values/PasswordPaciente';
import { CorreoPaciente } from '../values/CorreoPaciente';
import { FechaDeNacimiento } from '../values/FechaDenacimiento';
import { NombrePaciente } from '../values/NombrePaciente';
import { Agregado } from "../../../commun/dominio/entidades/Agregado";
import { Status } from '../values/Status';

export class Paciente extends Agregado<PacienteID>{
  
  private constructor(
    private readonly id: PacienteID,
    private genero: GeneroPaciente,
    private altura: Altura,
    private peso: Peso,
    private numero: NumeroTelefonico,
    private antecedentes: Antecedentes,
    private operacion: Operacion,
    private status: StatusSuscripcion,
    private alergia: Alergia,
    private password: PasswordPaciente,
    private correo: CorreoPaciente,
    private fechaNacimiento: FechaDeNacimiento,
    private nombre: NombrePaciente,
  ) {
    super();
  }


  //Metodos de la clase abstracta Agregado
  obtenerIdentificador(): PacienteID {
    return this.id;
  }

  esIgual(entidad: Paciente): boolean {
    return this.id.getPacienteID() === entidad.obtenerIdentificador().getPacienteID();
  }

  //GETTERS

  public getNombrePaciente(): NombrePaciente {
    return this.nombre;
  }

  public getFechaNacimiento(): FechaDeNacimiento {
    return this.fechaNacimiento;
  }

  public getCorreoPaciente(): CorreoPaciente {
    return this.correo;
  }

  public getPasswordPaciente(): PasswordPaciente {
    return this.password;
  }

  public getAlergia(): Alergia {
    return this.alergia;
  }
  
  public getStatusSuscripccion(): StatusSuscripcion {
    return this.status;
  }
  
  public getOperacion(): Operacion {
    return this.operacion;
  }

  public getGeneroPaciente(): GeneroPaciente {
    return this.genero;
  }

  public getAltura(): Altura {
    return this.altura;
  }

  public getPeso(): Peso {
    return this.peso;
  }

  public getNumeroTelefonico(): NumeroTelefonico {
    return this.numero;
  }

  public getAntecedentes(): Antecedentes {
    return this.antecedentes;
  }

  //SETTERS
  public setNombrePaciente(nombre: NombrePaciente): void {
    this.nombre = nombre;
  }

  public setFechaNacimiento(fechaNacimiento: FechaDeNacimiento): void {
    this.fechaNacimiento = fechaNacimiento;
  }

  public setCorreoPaciente(correo: CorreoPaciente): void {
    this.correo = correo;
  }

  public setPasswordPaciente(password: PasswordPaciente): void {
    this.password = password;
  }

  public setAlergia(alergia: Alergia): void {
    this.alergia = alergia;
  }

  public setStatusSuscripccion(status: StatusSuscripcion): void {
    this.status = status;
  }

  public setOperacion(operacion: Operacion): void {
    this.operacion = operacion;
  }

  //Eventos de Dominio Paciente
  public static Registrarpaciente(nombrePaciente: NombrePaciente, correo: CorreoPaciente, password: PasswordPaciente, genero: GeneroPaciente, 
                                  telefono: NumeroTelefonico,  fechaNacimiento: FechaDeNacimiento, peso?: Peso, altura?: Altura,alergia?: Alergia, operacion?: Operacion,
                                  antecedentes?: Antecedentes): Paciente {
    //Se crea el Id del paciente
    let id: PacienteID = PacienteID.crear();

    //Se Crea una instancia del paciente con los datos suministrados
    let paciente = new Paciente(id, genero, altura, peso, telefono, antecedentes, operacion, StatusSuscripcion.crear(Status.Activo), alergia, password, correo, fechaNacimiento, nombrePaciente);
    
    //Se genera el Evento de Dominio
    paciente.agregarEvento({
      Fecha: new Date(),
      Nombre: "PacienteRegistrado",
      Datos: {
        id_paciente: id,
        status_suscripccion: paciente.getStatusSuscripccion().getStatusSuscripcion(),
      }
    });

    return paciente;
  }

  public AtrasarStatusPaciente(): void {
    //Se agrega el nuevo estatus de suscripcion al paciente
    this.setStatusSuscripccion(StatusSuscripcion.crear(Status.Atrasado));

    this.agregarEvento({
      Fecha: new Date(),
      Nombre: "PacienteAtrasado",
      Datos: {
        id_paciente: this.obtenerIdentificador(),
        status_suscripccion: this.getStatusSuscripccion().getStatusSuscripcion(),
      }
    });
  }

  public SuspenderStatusPaciente(): void {
    //Se agrega el nuevo estatus de suscripcion al paciente
    this.setStatusSuscripccion(StatusSuscripcion.crear(Status.Suspendido));

    this.agregarEvento({
      Fecha: new Date(),
      Nombre: "PacienteSuspendido",
      Datos: {
        id_paciente: this.obtenerIdentificador(),
        status_suscripccion: this.getStatusSuscripccion().getStatusSuscripcion(),
      }
    });
  }

  public BloquearStatusPaciente(): void {
    //Se agrega el nuevo estatus de suscripcion al paciente
    this.setStatusSuscripccion(StatusSuscripcion.crear(Status.Bloqueado));

    this.agregarEvento({
      Fecha: new Date(),
      Nombre: "PacienteBloqueado",
      Datos: {
        id_paciente: this.obtenerIdentificador(),
        status_suscripccion: this.getStatusSuscripccion().getStatusSuscripcion(),
      }
    });
  }


}
