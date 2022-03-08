"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncStateFiles = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const constants_1 = require("./constants/constants");
const writeFile = (0, util_1.promisify)(fs_1.default.writeFile);
async function asyncStateFiles() {
    let length = Object.keys(constants_1.UF).length - 1;
    const keys = Object.keys(constants_1.UF);
    const newState = {};
    while (length !== -1) {
        const uf = keys[length];
        const url = `${constants_1.IBGE_URL}/${uf}/municipios`;
        const { data } = await axios_1.default.get(url);
        data.map(async (state) => {
            const stateName = state.microrregiao.mesorregiao.UF.nome;
            const citiesName = newState[stateName];
            if (citiesName) {
                citiesName.push({ city: state.nome });
            }
            else {
                newState[stateName] = [{ city: state.nome }];
            }
            const parseCities = JSON.stringify(newState[stateName]);
            const trimStateName = stateName.replaceAll(' ', '');
            await writeFile(`${trimStateName}.ts`, JSON.parse(JSON.stringify(`export const ${trimStateName} = ${parseCities}`)));
            return newState;
        });
        length -= 1;
        const stateName = constants_1.UF[uf].replaceAll(' ', '');
        const fileState = fs_1.default.createReadStream(`${stateName}.ts`);
        fileState.pipe(fs_1.default.createWriteStream('States.ts'));
    }
}
exports.asyncStateFiles = asyncStateFiles;
//# sourceMappingURL=asyncStateFile.js.map