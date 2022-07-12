
export class FechaCita {
    constructor ( readonly _fechaCita: Date ) {}

    public get fechaCita() : Date {
        return this._fechaCita;
    }
}