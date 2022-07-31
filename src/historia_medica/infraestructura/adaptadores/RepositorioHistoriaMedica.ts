import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRepositorioHistoriaMedica } from 'src/historia_medica/aplicacion/puertos/IRepositorioHistoriaMedica';
import { HistoriaMedicaORM } from '../persistencia/HistoriaMedica.orm';
import { PacienteORM } from '../../../paciente/infraestructura/persistencia/Paciente.orm';


@Injectable()
export class RepositorioHistoriaMedica implements IRepositorioHistoriaMedica {

    constructor(
        @InjectRepository(HistoriaMedicaORM)
        private readonly historiaRepository: Repository<HistoriaMedicaORM>,
        @InjectRepository(PacienteORM)
        private readonly pacienteRepository: Repository<PacienteORM>
    ) { }

    async obtenerHistoriaById(id: string) {
        const HistoriaMedica = await this.historiaRepository.findOneBy({
            id_historia: id
        })
        return HistoriaMedica;
    }

    async crearHistoriaMedica(id: string, pacienteId: string) {

        const paciente = await this.pacienteRepository.findOneBy({
            id_paciente: pacienteId
        });

       const HistoriaCreada = await this.historiaRepository.insert(
        {
            id_historia:id,
            paciente: paciente
        }
       )
       return HistoriaCreada;
    }
    
}
