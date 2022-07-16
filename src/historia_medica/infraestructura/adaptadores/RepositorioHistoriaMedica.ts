import { InjectRepository } from '@nestjs/typeorm';
import { IRepositorioHistoriaMedica } from '../../aplicacion/puertos/IRepositoryHistoriaMedica';
import { HistoriaMedicaORM } from '../persistencia/HistoriaMedica.orm';
import { Repository } from 'typeorm';
import { HistoriaMedicaDataDTO } from 'src/historia_medica/aplicacion/dto/HistoriaMedicaDataDTO';

export class RepositorioHistoriaMedica implements IRepositorioHistoriaMedica {
  constructor(
    @InjectRepository(HistoriaMedicaORM)
    private readonly repositorioHistoriaMedica: Repository<HistoriaMedicaORM>,
  ) {}

  async crear(historiaMedica: HistoriaMedicaDataDTO): Promise<void> {
    try {
      this.repositorioHistoriaMedica.insert({
        id_historia: historiaMedica.id_historia,
      });
    } catch (error) {}
  }

  async obtener(id: string): Promise<HistoriaMedicaDataDTO> {
    try {
      const historiaMedica = await this.repositorioHistoriaMedica.findOne({
        where: {
          id_historia: id,
        },
      });
      const historiaDTO: HistoriaMedicaDataDTO = {
        id_historia: historiaMedica.id_historia,
        id_paciente: historiaMedica.paciente.id_paciente,
        RegistrosMedicos: historiaMedica.registroMedico.map(
          (registro) => registro.id_registro,
        ),
      };

      return historiaDTO;
    } catch (error) {}
  }
}
