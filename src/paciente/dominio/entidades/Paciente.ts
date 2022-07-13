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
import { FechaDeNacimiento } from '../values/FechaDeNacimiento';
import { NombrePaciente } from '../values/NombrePaciente';

export class Paciente {
  constructor(
    private id: PacienteID,
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
  ) {}

  public getPacienteId(): PacienteID {
    return this.id;
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
}
