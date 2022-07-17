import { Body, Controller, Get, Inject, Param, Put} from '@nestjs/common';
import { AgendarCitaDTO } from 'src/cita/aplicacion/dto/AgendarCitaDTO';
import { AgendarCita } from 'src/cita/aplicacion/servicios/AgendarCita';
import { CitasDoctor } from '../../aplicacion/servicios/CitasDoctor';
import { CitasSolicitadasDoctor } from '../../aplicacion/servicios/CitasSolicitadasDoctor';



@Controller('api/cita')
export class CitaController {
  constructor(
    @Inject(CitasSolicitadasDoctor)
    private readonly citasSolicitadasDoctor: CitasSolicitadasDoctor,
    private readonly citasDoctor: CitasDoctor,
    private readonly agendarCita: AgendarCita
  ) {}

  @Get('getsolicitudesdoctor/:doctorid')
  async getSolicitadasDoctor(@Param('doctorid') doctorid: string) {
    const citas = await this.citasSolicitadasDoctor.ejecutar(doctorid);
    return citas;
  }

  @Get('getcitasdoctor/:doctorid')
  async getTodasDoctor(@Param('doctorid') doctorid: string) {
    const citas = await this.citasDoctor.ejecutar(doctorid);
    return citas;
  }

  @Put('putagendarcita/:citaid')
  async postAgendar(@Body() datos: AgendarCitaDTO, @Param('citaid') citaid: string) {
    datos.idCita = citaid;
    const citas = await this.agendarCita.ejecutar(datos);
    console.log(citas);
    return citas;
  }


}
