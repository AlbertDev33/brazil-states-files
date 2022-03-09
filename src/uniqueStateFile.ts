import axios from 'axios';
import { createWriteStream } from 'fs';
import { IBGE_URL, UF } from './constants/constants';
import { ICityShape, ICityName, IAxiosShape } from './interfaces/IStates';

const fetchStates = async (url: string): Promise<IAxiosShape[]> => {
  const { data } = await axios.get<IAxiosShape[]>(url);
  return data;
};

export async function uniqueStateFile(): Promise<void> {
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

  const result = data.reduce((statesAcc, ibgeData) => {
    let acc: ICityName = {};
    acc = statesAcc;
    ibgeData.forEach(region => {
      const stateName = region.microrregiao.mesorregiao.UF.nome;
      const state = acc[stateName] || [];
      const city: ICityShape = { city: region.nome };

      state.push(city);
      acc[stateName] = state;
    });

    return acc;
  }, {} as ICityName);

  const file = createWriteStream(`./States.json`);
  file.once('open', () => {
    file.write(JSON.stringify(result));
    file.end();
  });
}

uniqueStateFile()
  .then(() => console.log('Done'))
  .catch(err => console.log(err));
