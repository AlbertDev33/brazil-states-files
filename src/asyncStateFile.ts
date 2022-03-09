import axios from 'axios';
import fs from 'fs';
import { promisify } from 'util';
import { IBGE_URL, UF } from './constants/constants';
import { ICityName, IAxiosShape } from './interfaces/IStates';

const writeFile = promisify(fs.writeFile);

const fetchStates = async (url: string): Promise<IAxiosShape[]> => {
  const { data } = await axios.get<IAxiosShape[]>(url);
  return data;
};
export async function asyncStateFiles(extension?: 'js' | 'ts') {
  const promise = [];
  let length = Object.keys(UF).length - 1;
  const keys = Object.keys(UF);
  const newState = {} as ICityName;

  while (length !== -1) {
    const uf = keys[length];
    const url = `${IBGE_URL}/${uf}/municipios`;
    promise.push(fetchStates(url));
    length -= 1;
  }

  const data = await Promise.all<IAxiosShape[]>(promise);

  data.map(async state => {
    state.forEach(async region => {
      const stateName = region.microrregiao.mesorregiao.UF.nome;
      const citiesName = newState[stateName];

      if (citiesName) {
        citiesName.push({ city: region.nome });
      } else {
        newState[stateName] = [{ city: region.nome }];
      }
      const parseCities = JSON.stringify(newState[stateName]);
      const trimStateName = stateName.replaceAll(' ', '');
      const treatStateName = stateName
        .replaceAll(' ', '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      const fileExtension =
        `${trimStateName}.${extension}` || `${trimStateName}.ts`;

      await writeFile(
        `${fileExtension}`,
        JSON.parse(
          JSON.stringify(`export const ${treatStateName} = ${parseCities}`),
        ),
      );
    });
    return newState;
  });
}
