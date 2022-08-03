import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtPacienteGuard extends AuthGuard('jwt-paciente') {}