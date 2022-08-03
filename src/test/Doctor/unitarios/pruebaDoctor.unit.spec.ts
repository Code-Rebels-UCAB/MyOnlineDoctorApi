
/*
import { JwtService } from "@nestjs/jwt";
import { DoctorORM } from "../../../doctor/infraestructura/persistencia/Doctor.orm";
import { RepositorioDoctor } from "../../../doctor/infraestructura/adaptadores/RepositorioDoctor";
import { Data } from "../../../commun/infraestructura/database/database.service"
import { DoctorRepoMockFactory } from "src/test/fabricas/DoctorRepoMockFactory";

jest.mock("../../../doctor/infraestructura/adaptadores/RepositorioDoctor");

*/

import { DoctorRepoMockFactory } from "../../fabricas/DoctorRepoMockFactory";



describe('Unitario - Calificar Doctor', () => {
    let repo;

    beforeAll(() => {
        repo = DoctorRepoMockFactory.Crear()
        //repo = new RepositorioDoctor( Data.getRepository(DoctorORM), new JwtService());
    })

    it('Caso de Prueba A de agendar cita', () => {
        expect(repo.obtenerDoctorById('')).toBe('ABA');
    })


})