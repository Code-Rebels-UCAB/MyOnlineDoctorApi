import { ConsultarPacienteRespuestaDTO } from '../../../aplicacion/dto/queries/ConsultarPaciente.query';
import { IRepositorioPaciente } from '../../../aplicacion/puertos/IRepositorioPaciente';

const Paciente = [
  {
    id_paciente: 'ed649257-8091-4b77-827a-8532b5c4c826',
    p_nombre: 'Franco',
    s_nombre: 'Jose',
    p_apellido: 'Gavidia',
    s_apellido: 'Rodriguez',
    fecha_nacimiento: '1979-05-09',
    telefono: '+58414-500-0159',
    correo: 'FrancoGav@example.net',
    sexo: 'M',
    altura: '229',
    peso: '89',
    contrasena: 'Pciente1234',
    status_suscripcion: 'Activo',
    alergia: null,
    antecedentes: 'Dolor en la nariz',
    operacion: null,
  },
  {
    id_paciente: '1b1c1ea7-441e-4efd-afd2-7c4cb1d5da03',
    p_nombre: 'Alines',
    s_nombre: 'Maria',
    p_apellido: 'Ortiz',
    s_apellido: 'Rodriguez',
    fecha_nacimiento: '1917-04-25',
    telefono: '+58414-420-3090',
    correo: 'AlinesOrtiz24@example.net',
    sexo: 'F',
    altura: '194',
    peso: '15',
    contrasena: 'Pciente1234',
    status_suscripcion: 'Atrasado',
    alergia: 'Algodon',
    antecedentes: 'Dolor de cabeza',
    operacion: null,
  },
  {
    id_paciente: '56ba95ea-accc-458d-962f-b88edab62ba8',
    p_nombre: 'Carlos',
    s_nombre: 'Carles',
    p_apellido: 'Landaeta',
    s_apellido: 'Longaniza',
    fecha_nacimiento: '1936-02-19',
    telefono: '+58414-929-8417',
    correo: 'CarlosLand_aeta50@example.net',
    sexo: 'M',
    altura: '182',
    peso: '124',
    contrasena: 'Pciente1234',
    status_suscripcion: 'Activo',
    alergia: null,
    antecedentes: 'Dolor en el pie izquierdo',
    operacion: null,
  },
];

export class RepositorioPaciente implements IRepositorioPaciente {
  obtenerTodosPacientes() {
    throw new Error('Method not implemented.');
  }

  registrarPaciente(pacienteNuevo: ConsultarPacienteRespuestaDTO) {
    throw new Error('Method not implemented.');
  }
  obtenerCantidadTotalPacientes() {
    return Paciente.length;
  }
  guardarTokenPaciente(pacienteid: string, tokenPaciente: string) {
    throw new Error('Method not implemented.');
  }
  obtenerPacienteById(id: string) {
    const datos = Paciente.filter((paciente) => paciente.id_paciente == id);

    return datos[0];
  }
  buscarDatosIniciarSesionPaciente(correoPaciente: string) {
    throw new Error('Method not implemented.');
  }
  obtenerPacienteByNombreorApellido(nombre: string) {
    throw new Error('Method not implemented.');
  }
  obtenerPacienteByTelefono(telefono: string) {
    throw new Error('Method not implemented.');
  }
  bloquearPaciente(id: string) {
    return true;
  }
  suspenderPaciente(id: string) {
    return true;
  }
}
