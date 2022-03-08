import axios from 'axios';
import { createWriteStream } from 'fs';
import { IBGE_URL, UF } from './Constants/constants';
import { ICityShape, ICityName, IStatesShape } from './interfaces/IStates';

const fetchStates = async (url: string) => {
  const { data } = await axios.get<IStatesShape[]>(url);
  return data;
};

async function states() {
  let length = Object.keys(UF).length - 1;
  const keys = Object.keys(UF);

  while (length !== -1) {
    const uf = keys[length];
    const url = `${IBGE_URL}/${uf}/municipios`;
    const data = await fetchStates(url);

    data.reduce((statesAcc, ibgeData) => {
      let acc = {} as ICityName;
      acc = statesAcc;
      const stateName = ibgeData.microrregiao.mesorregiao.UF.nome;
      const state = acc[stateName] || [];
      const city: ICityShape = { city: ibgeData.nome };
      state.push(city);
      acc[stateName] = state;

      const parseCities = JSON.stringify(state);
      const trimStateName = stateName.replaceAll(' ', '');

      const file = createWriteStream(`./${stateName}.ts`);
      file.once('open', () => {
        file.write(
          JSON.parse(
            JSON.stringify(`export const ${trimStateName} = ${parseCities}`),
          ),
        );
        file.end();
      });

      return acc;
    }, {} as ICityName);
    length -= 1;
  }
}

states()
  .then(() => console.log('Done'))
  .catch(err => console.log(err));
