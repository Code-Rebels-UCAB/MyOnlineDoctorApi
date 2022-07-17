import { Body, Controller, Get, Inject, Param, Post} from '@nestjs/common';
import { CitasDoctor } from '../../aplicacion/servicios/CitasDoctor';
import { CitasSolicitadasDoctor } from '../../aplicacion/servicios/CitasSolicitadasDoctor';



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

  @Post('agendar/:citaid')
  async postAgendar(@Body() datos: string, @Param('citaid') citaid: string) {
    //const citas = await this.citasDoctor.ejecutar(datos,citaid);
    return datos;
  }


}
