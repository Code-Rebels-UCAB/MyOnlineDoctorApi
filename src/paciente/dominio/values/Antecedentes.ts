import { IValueObject } from "../../../commun/dominio/values/IValueObject"
import { AntecedentesVacio } from "../excepciones/AntecedentesVacio";

export class Antecedentes implements IValueObject {
    private constructor(private readonly valor: string) {}
  
    public getAntecedentesValor() {
      return this.valor;
    }
  
    public esIgual(antecedentes: Antecedentes): boolean {
      return this.valor == antecedentes.getAntecedentesValor()
    }
  
    public static crear(valor: string){
      // if (valor == null || valor == undefined || valor == ''){
      //   //LANZA LA EXCEPCION
      //   throw new AntecedentesVacio('El Antecedente del Paciente no puede estar vacio');
      // }
      return new Antecedentes(valor);
    }
}
  