import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRepositorioHistoriaMedica } from 'src/historia_medica/aplicacion/puertos/IRepositorioHistoriaMedica';
import { HistoriaMedicaORM } from '../persistencia/HistoriaMedica.orm';


@Injectable()
export class RepositorioHistoriaMedica implements IRepositorioHistoriaMedica {

    constructor(
        @InjectRepository(HistoriaMedicaORM)
        private readonly historiaRepository: Repository<HistoriaMedicaORM>
    ) { }

    async obtenerHistoriaById(id: string) {
        const HistoriaMedica = await this.historiaRepository.findOneBy({
            id_historia: id
        })
        return HistoriaMedica;
    }

    async crearHistoriaMedica(id: string, pacienteId: string) {
       const HistoriaCreada = await this.historiaRepository.insert(
        {
            id_historia:id,
            paciente: () => pacienteId
        }
       )
       return HistoriaCreada;
    }
    
}
