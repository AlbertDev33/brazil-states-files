export interface ICityShape {
    city: string;
}
export interface ICityName {
    [key: string]: ICityShape[];
}
export interface IUFName {
    [key: string]: string;
}
export interface IStatesShape {
    nome: string;
    microrregiao: {
        mesorregiao: {
            UF: {
                nome: string;
            };
        };
    };
}
export declare type IAxiosShape = Array<IStatesShape>;
