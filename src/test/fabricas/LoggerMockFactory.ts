
import { LoggerService } from "../../commun/infraestructura/logger/logger.service";

jest.mock("../../commun/infraestructura/logger/logger.service");



export class LoggerMockFactory {

   static Crear(){
    return new LoggerService();
   }

}