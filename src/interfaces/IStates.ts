export interface ICityShape {
  city: string;
}

// key is state name
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

export type IAxiosShape = Array<IStatesShape>;
