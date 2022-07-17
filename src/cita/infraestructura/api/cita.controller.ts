import { Controller, Get, Inject, Param} from '@nestjs/common';
import { CitasDoctor } from 'src/cita/aplicacion/servicios/CitasDoctor';
import { CitasSolicitadasDoctor } from 'src/cita/aplicacion/servicios/CitasSolicitadasDoctor';



@Controller('api/cita')
export class CitaController {
  constructor(
    @Inject(CitasSolicitadasDoctor)
    private readonly citasSolicitadasDoctor: CitasSolicitadasDoctor,
    private readonly citasDoctor: CitasDoctor,
  ) {}

  @Get('solicitadas/:doctorid')
  async getSolicitadas(@Param('doctorid') doctorid: string) {
    const citas = await this.citasSolicitadasDoctor.ejecutar(doctorid);
    return citas;
  }

  @Get('todas/:doctorid')
  async getTodas(@Param('doctorid') doctorid: string) {
    const citas = await this.citasDoctor.ejecutar(doctorid);
    return citas;
  }


}
