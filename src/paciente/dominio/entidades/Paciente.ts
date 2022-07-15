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
import { EventoDominio } from 'src/commun/dominio/eventos/Evento';

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
  public setAlergia(alergia: Alergia) {
    this.alergia = alergia;
  }

  public getStatusSuscripccion(): StatusSuscripcion {
    return this.status;
  }

  public setStatusSuscripccion(status: StatusSuscripcion) {
    this.status = status;
  }

  public getOperacion(): Operacion {
    return this.operacion;
  }

  public setOperacion(operacion: Operacion) {
    this.operacion = operacion;
  }

  public getGeneroPaciente(): GeneroPaciente {
    return this.genero;
  }

  public getAltura(): Altura {
    return this.altura;
  }
  public setAltura(altura: Altura) {
    this.altura = altura;
  }

  public getPeso(): Peso {
    return this.peso;
  }

  public setPeso(peso: Peso) {
    this.peso = peso;
  }
  public getNumeroTelefonico(): NumeroTelefonico {
    return this.numero;
  }

  public getAntecedentes(): Antecedentes {
    return this.antecedentes;
  }

  public setAntecendentes(antecedentes: Antecedentes) {
    this.antecedentes = antecedentes;
  }

  obtenerIdentificador(): PacienteID {
    return this.id;
  }
  esIgual(entidad: Paciente): boolean {
    return this.id.getPacienteID() === entidad.obtenerIdentificador().getPacienteID();
  }

  //Eventos de Dominio Paciente
  public static Registrarpaciente(nombrePaciente: NombrePaciente, correo: CorreoPaciente, password: PasswordPaciente, genero: GeneroPaciente, 
                                  telefono: NumeroTelefonico,  fechaNacimiento: FechaDeNacimiento, peso?: Peso, altura?: Altura,alergia?: Alergia, operacion?: Operacion,
                                  antecedentes?: Antecedentes, status_suscripccion?: StatusSuscripcion): Paciente {
    //Se agrega el nuevo estatus de suscripcion al paciente
    // this.setStatusSuscripccion(status);

    // this.agregarEvento({
    //   Fecha: new Date(),
    //   Nombre: "PacienteBloqueado",
    //   Datos: {
    //     id_paciente: this.obtenerIdentificador(),
    //     status_suscripccion: this.getStatusSuscripccion
    //   }
    // });

    return 
  }

  public AtrasarStatusPaciente(status: StatusSuscripcion): void {
    //Se agrega el nuevo estatus de suscripcion al paciente
    this.setStatusSuscripccion(status);

    this.agregarEvento({
      Fecha: new Date(),
      Nombre: "PacienteAtrasado",
      Datos: {
        id_paciente: this.obtenerIdentificador(),
        status_suscripccion: this.getStatusSuscripccion()
      }
    });
  }

  public SuspenderStatusPaciente(status: StatusSuscripcion): void {
    //Se agrega el nuevo estatus de suscripcion al paciente
    this.setStatusSuscripccion(status);

    this.agregarEvento({
      Fecha: new Date(),
      Nombre: "PacienteSuspendido",
      Datos: {
        id_paciente: this.obtenerIdentificador(),
        status_suscripccion: this.getStatusSuscripccion()
      }
    });
  }

  public BloquearStatusPaciente(status: StatusSuscripcion): void {
    //Se agrega el nuevo estatus de suscripcion al paciente
    this.setStatusSuscripccion(status);

    this.agregarEvento({
      Fecha: new Date(),
      Nombre: "PacienteBloqueado",
      Datos: {
        id_paciente: this.obtenerIdentificador(),
        status_suscripccion: this.getStatusSuscripccion()
      }
    });
  }


}
