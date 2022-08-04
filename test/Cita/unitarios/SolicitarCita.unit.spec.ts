import { LoggerMockFactory } from '../../fabricas/LoggerMockFactory';
import { CitaRepoMockFactory } from '../../fabricas/CitaRepoMockFactory';
import { SolicitarCita } from '../../../src/cita/aplicacion/servicios/SolicitarCita.service';


describe('Unitario - CU Agendar Cita', () => {
  let mockRepositorioCita;
  let mockLoggerService;
  let casoUso: SolicitarCita;

  beforeAll(() => {
    mockRepositorioCita = CitaRepoMockFactory.Crear();
    mockLoggerService = LoggerMockFactory.Crear();
    casoUso = new SolicitarCita(mockLoggerService, mockRepositorioCita);
  });

  
    it('Debe retornar una cita solicitada', async () => {
        const resultado = casoUso.ejecutar({
            id_paciente: "4a2ed3f9-5331-41a7-89e1-c8d1f76d23e7" ,
            id_doctor: "dd2d571a-aadf-4213-a81f-ade5f5e89893",
            modalidad: "Virtual",
            motivo: "Prueba Test"
        });
    
        return resultado.then((res) => {
          expect(res.esExitoso).toBeTruthy();
          expect(res.valor.statuscita).toBe('Solicitada');
        });
    });

  



});
