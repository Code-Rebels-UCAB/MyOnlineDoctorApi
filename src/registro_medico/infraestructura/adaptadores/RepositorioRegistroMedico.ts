import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRepositorioRegistroMedico } from '../../../registro_medico/aplicacion/puertos/IRepositorioRegistroMedico';
import { CrearRegistroMedicoDTO } from '../../../registro_medico/aplicacion/dto/CrearRegistroMedicoDTO';
import { RegistroMedicoORM } from '../persistencia/RegistroMedico.orm';
import { HistoriaMedicaORM } from '../../../historia_medica/infraestructura/persistencia/HistoriaMedica.orm';



@Injectable()
export class RepositorioRegistroMedico implements IRepositorioRegistroMedico {

    constructor(
        @InjectRepository(RegistroMedicoORM)
        private readonly registroMedicoRepository: Repository<RegistroMedicoORM>,
        @InjectRepository(HistoriaMedicaORM)
        private readonly historiaMedicaRepository: Repository<HistoriaMedicaORM>
    ) { }

    CrearRegistro(datos: CrearRegistroMedicoDTO) {
        throw new Error('Method not implemented.');
    }


    async ObtenerHistoriaMedicaAsociada(pacienteId: string) {
        const HistoriaMedica = await this.historiaMedicaRepository
          .createQueryBuilder('historia')
          .where('historia.id_paciente = :id', {
            id: pacienteId,
          })
          .select(['historia.id_historia'])
          .getOne();

        return HistoriaMedica.id_historia;
    }

  
    
}
