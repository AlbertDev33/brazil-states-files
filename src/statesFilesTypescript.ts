import axios from 'axios';
import { createWriteStream } from 'fs';
import { IBGE_URL, UF } from './constants/constants';
import {
  ICityShape,
  ICityName,
  IStatesShape,
  IAxiosShape,
} from './interfaces/IStates';

const fetchStates = async (url: string) => {
  const { data } = await axios.get<IStatesShape[]>(url);
  return data;
};

export async function statesFilesTypescript() {
  const promise = [];
  let length = Object.keys(UF).length - 1;
  const keys = Object.keys(UF);

  while (length !== -1) {
    const uf = keys[length];
    const url = `${IBGE_URL}/${uf}/municipios`;
    promise.push(fetchStates(url));
    length -= 1;
  }

  const data = await Promise.all<IAxiosShape[]>(promise);

  data.reduce((statesAcc, ibgeData) => {
    let acc = {} as ICityName;
    acc = statesAcc;
    ibgeData.forEach(region => {
      const stateName = region.microrregiao.mesorregiao.UF.nome;
      const state = acc[stateName] || [];
      const city: ICityShape = { city: region.nome };
      state.push(city);
      acc[stateName] = state;

      const parseCities = JSON.stringify(state);
      const trimStateName = stateName.replaceAll(' ', '');
      const treatStateName = stateName
        .replaceAll(' ', '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      const file = createWriteStream(`./${trimStateName}.ts`);
      file.once('open', () => {
        file.write(
          JSON.parse(
            JSON.stringify(`export const ${treatStateName} = ${parseCities}`),
          ),
        );
        file.end();
      });
    });

    return acc;
  }, {} as ICityName);
}

statesFilesTypescript()
  .then(() => console.log('Done'))
  .catch(err => console.error(err));
