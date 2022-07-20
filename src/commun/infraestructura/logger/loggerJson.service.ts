import {writeFile} from 'fs/promises';
import { IDataSave } from "../../aplicacion/puertos/IData";


export class LoggerJSON {


    save(data: {}): void {
        writeFile('./data/logger.json', JSON.stringify(data, null, 2), 'utf8');
    }

    static saveJson(context: string, message: string){
        const data: {} = {
            context: context,
            message: message,
            date: new Date().toISOString()
        };
        writeFile('./logger.json', JSON.stringify(data, null, 2,), 'utf8');
    
    }
}


