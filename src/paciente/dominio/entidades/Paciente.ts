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
import { StatusPaciente } from '../values/StatusPaciente';
import { PacienteRegistrado } from '../eventos/PacienteRegistrado';
import { PacienteSuspendido } from '../eventos/PacienteSuspendido';
import { PacienteAtrasado } from '../eventos/PacienteAtrasado';
import { PacienteBloqueado } from '../eventos/PacienteBloqueado';

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
  public static registrarPaciente(nombrePaciente: NombrePaciente, correo: CorreoPaciente, password: PasswordPaciente, genero: GeneroPaciente, 
                                  telefono: NumeroTelefonico,  fechaNacimiento: FechaDeNacimiento, peso?: Peso, altura?: Altura,alergia?: Alergia, operacion?: Operacion,
                                  antecedentes?: Antecedentes): Paciente {
    //Se crea el Id del paciente
    let id: PacienteID = PacienteID.crear();

    //Se Crea una instancia del paciente con los datos suministrados
    let paciente = new Paciente(id, genero, altura, peso, telefono, antecedentes, operacion, StatusSuscripcion.crear(StatusPaciente.Activo), alergia, password, correo, fechaNacimiento, nombrePaciente);
    
    //Se genera el Evento de Dominio
    paciente.agregarEvento(
      new PacienteRegistrado(id.getPacienteID().toString(),
                              paciente.getStatusSuscripccion().getStatusSuscripcion().toString(),new Date())
    );

    return paciente;
  }

  public atrasarStatusPaciente(): void {
    //Se agrega el nuevo estatus de suscripcion al paciente
    this.setStatusSuscripccion(StatusSuscripcion.crear(StatusPaciente.Atrasado));

    this.agregarEvento(
      new PacienteAtrasado(this.obtenerIdentificador().getPacienteID().toString(),
                              this.getStatusSuscripccion().getStatusSuscripcion().toString(),new Date())
    );
  }

  public suspenderStatusPaciente(): void {
    //Se agrega el nuevo estatus de suscripcion al paciente
    this.setStatusSuscripccion(StatusSuscripcion.crear(StatusPaciente.Suspendido));

    this.agregarEvento(
      new PacienteSuspendido(this.obtenerIdentificador().getPacienteID().toString(),
                              this.getStatusSuscripccion().getStatusSuscripcion().toString(),new Date())
    );
  }

  public bloquearStatusPaciente(): void {
    //Se agrega el nuevo estatus de suscripcion al paciente
    this.setStatusSuscripccion(StatusSuscripcion.crear(StatusPaciente.Bloqueado));

    this.agregarEvento(
      new PacienteBloqueado(this.obtenerIdentificador().getPacienteID().toString(),
                              this.getStatusSuscripccion().getStatusSuscripcion().toString(),new Date())
    );
  }

}
