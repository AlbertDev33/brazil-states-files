import axios from 'axios';
import fs from 'fs';
import { promisify } from 'util';
import { IBGE_URL, UF } from './constants/constants';
import { IStatesShape, ICityName } from './interfaces/IStates';

const writeFile = promisify(fs.writeFile);

export async function states() {
  let length = Object.keys(UF).length - 1;
  const keys = Object.keys(UF);
  const newState = {} as ICityName;

  while (length !== -1) {
    const uf = keys[length];
    const url = `${IBGE_URL}/${uf}/municipios`;
    const { data } = await axios.get<IStatesShape[]>(url);

    data.map(async state => {
      const stateName = state.microrregiao.mesorregiao.UF.nome;
      const citiesName = newState[stateName];

      if (citiesName) {
        citiesName.push({ city: state.nome });
      } else {
        newState[stateName] = [{ city: state.nome }];
      }
      const parseCities = JSON.stringify(newState[stateName]);
      const trimStateName = stateName.replaceAll(' ', '');
      await writeFile(
        `${trimStateName}.ts`,
        JSON.parse(
          JSON.stringify(`export const ${trimStateName} = ${parseCities}`),
        ),
      );
      return newState;
    });
    length -= 1;
    const stateName = UF[uf].replaceAll(' ', '');
    const fileState = fs.createReadStream(`${stateName}.ts`);
    fileState.pipe(fs.createWriteStream('States.ts'));
  }
}
