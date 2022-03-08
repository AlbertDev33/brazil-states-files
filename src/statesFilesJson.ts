import axios from 'axios';
import { createWriteStream } from 'fs';
import { IBGE_URL, UF } from './constants/constants';
import { ICityShape, ICityName, IAxiosShape } from './interfaces/IStates';

const fetchStates = async (url: string): Promise<IAxiosShape[]> => {
  const { data } = await axios.get<IAxiosShape[]>(url);
  return data;
};

export async function states(): Promise<void> {
  let length = Object.keys(UF).length - 1;
  const keys = Object.keys(UF);
  const promise = [];

  while (length !== -1) {
    const uf = keys[length];
    const url = `${IBGE_URL}/${uf}/municipios`;
    promise.push(fetchStates(url));
    length -= 1;
  }

  const data = await Promise.all<IAxiosShape[]>(promise);

  data.reduce((statesAcc, ibgeData) => {
    let acc: ICityName = {};
    acc = statesAcc;
    ibgeData.forEach(region => {
      const stateName = region.microrregiao.mesorregiao.UF.nome;
      const state = acc[stateName] || [];
      const city: ICityShape = { city: region.nome };

      state.push(city);
      acc[stateName] = state;

      const parseCitiesName = JSON.stringify(state);
      const parseStateName = JSON.stringify(stateName);

      const file = createWriteStream(`./${stateName}.json`);
      file.once('open', () => {
        file.write(
          JSON.parse(JSON.stringify(`{${parseStateName}: ${parseCitiesName}}`)),
        );
        file.end();
      });
    });

    return acc;
  }, {} as ICityName);
}
