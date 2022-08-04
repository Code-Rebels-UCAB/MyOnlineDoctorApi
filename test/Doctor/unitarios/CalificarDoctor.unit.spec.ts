import { LoggerMockFactory } from '../../fabricas/LoggerMockFactory';
import { CalificarDoctor } from '../../../src/doctor/aplicacion/servicios/CalificarDoctor.service';
import { DoctorRepoMockFactory } from '../../fabricas/DoctorRepoMockFactory';
import { CalificarDoctorDTO } from '../../../src/doctor/aplicacion/dtos/CalificarDoctorDTO';



const CalificacionDoctor : CalificarDoctorDTO = {
    idDoctor:'0462d106-df70-4f8d-b322-0c736f4069e7',
    idPaciente: 'ar2tf71a-aadf-4213-a81f-ade5sd5e989',
    calificacionDoctor: 5
}

const CalificacionDoctorFake= {
    idDoctor:'1',
    idPaciente: '1',
    calificacionDoctor: -5
}

const CalificacionLess0= {
    idDoctor:'0462d106-df70-4f8d-b322-0c736f4069e7',
    idPaciente: 'ar2tf71a-aadf-4213-a81f-ade5sd5e989',
    calificacionDoctor: -5
}



describe('Unitario - CU Calificar Doctor', () => {
    let mockRepositorioDoctor;
    let mockLoggerService;
    let casoUso: CalificarDoctor;
  
    beforeAll(() => {
      mockRepositorioDoctor = DoctorRepoMockFactory.Crear();
      mockLoggerService = LoggerMockFactory.Crear();
      casoUso = new CalificarDoctor(mockLoggerService, mockRepositorioDoctor);
    });
  
    it('Debe devolver la calificacion dada', () => {
      const resultado = casoUso.ejecutar(CalificacionDoctor);
  
      return resultado.then((res) => {
        expect(res.esExitoso).toBeTruthy();
        expect(res.valor.calificacion).toBe(5);
      });
    });
  
    it('Un doctor que no existe, no debe devolver la calificacion del doctor', () => {
      const resultado = casoUso.ejecutar(CalificacionDoctorFake);
  
      return resultado.then((res) => {
        expect(res.esExitoso).toBeFalsy();
        expect(res.valor).toBe(null);
      });
    });

    it('Un doctor no puede ser calificado con un puntaje menor a 0', () => {
        const resultado = casoUso.ejecutar(CalificacionLess0);
    
        return resultado.then((res) => {
          expect(res.esExitoso).toBeFalsy();
          expect(res.error).toEqual({"mensaje": "La calificación no debe ser menor a 0", "origen": "CalificacionInvalida"});
        });
    });


  });