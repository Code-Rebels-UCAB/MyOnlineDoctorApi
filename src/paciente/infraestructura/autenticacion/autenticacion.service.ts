import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Resultado } from '../../../commun/aplicacion/Resultado';
import { AutenticacionDatosDTO } from './dto/AutenticacionDatosDTO';
import { JwtToken } from './dto/jwt.token';
import { IEncriptarContrasena } from '../../../paciente/aplicacion/puertos/IEncriptarContraseña';
import { IRepositorioPaciente } from '../../../paciente/aplicacion/puertos/IRepositorioPaciente';
import { ILogger } from '../../../commun/aplicacion/puertos/ILogger';

@Injectable()
export class ServicioAutenticacion {
  constructor(
    private readonly jwtServicio: JwtService,
    @Inject(IRepositorioPaciente)
    private readonly repositorioPaciente: IRepositorioPaciente,
    @Inject(IEncriptarContrasena)
    private readonly contrasenaEncriptada: IEncriptarContrasena,
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {}

  async validarPaciente(datos: AutenticacionDatosDTO) {
    const { correoPaciente, passwordPaciente } = datos;
    const paciente =
      await this.repositorioPaciente.buscarDatosIniciarSesionPaciente(
        correoPaciente,
      );
    if (
      paciente &&
      (await this.contrasenaEncriptada.chequearContrasena(
        passwordPaciente,
        paciente.contrasena,
      ))
    ) {
      const payload: JwtToken = {
        idPaciente: paciente.id_paciente,
      };
      const tokenDeAcceso = await this.jwtServicio.sign(payload, {
        secret: 'CODEREBELS',
      });

      this.logger.log(
        'El paciente con Identificador ' +
          paciente.id_paciente +
          ' ha sido autenticado e inicio sesion',
        'Token: ' + tokenDeAcceso,
      );

      return Resultado.Exito<{ tokenDeAcceso }>({ tokenDeAcceso });
    }

    throw new UnauthorizedException();
  }
}
