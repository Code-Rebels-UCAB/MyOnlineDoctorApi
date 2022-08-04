import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from '../../../aplicacion/puertos/ILogger';

export class LoggerService extends Logger implements ILogger {

    debug(context: string, message: string) {

    }

    log(context: string, message: string) {
       
    }

    error(context: string, message: string, trace?: string) {
    }

    warn(context: string, message: string) {
    }

    verbose(context: string, message: string) {
    }

    save(context: string, message: string){
      
    }
  
  }
  