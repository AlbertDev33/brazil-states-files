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
const fetchStates = async (url) => {
    const { data } = await axios_1.default.get(url);
    return data;
};
async function asyncStateFiles() {
    const promise = [];
    let length = Object.keys(constants_1.UF).length - 1;
    const keys = Object.keys(constants_1.UF);
    const newState = {};
    while (length !== -1) {
        const uf = keys[length];
        const url = `${constants_1.IBGE_URL}/${uf}/municipios`;
        promise.push(fetchStates(url));
        length -= 1;
    }
    const data = await Promise.all(promise);
    data.map(async (state) => {
        state.forEach(async (region) => {
            const stateName = region.microrregiao.mesorregiao.UF.nome;
            const citiesName = newState[stateName];
            if (citiesName) {
                citiesName.push({ city: region.nome });
            }
            else {
                newState[stateName] = [{ city: region.nome }];
            }
            const parseCities = JSON.stringify(newState[stateName]);
            const trimStateName = stateName.replaceAll(' ', '');
            const treatStateName = stateName
                .replaceAll(' ', '')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
            await writeFile(`${trimStateName}.ts`, JSON.parse(JSON.stringify(`export const ${treatStateName} = ${parseCities}`)));
            const fileState = fs_1.default.createReadStream(`${trimStateName}.ts`);
            fileState.pipe(fs_1.default.createWriteStream('States.ts'));
        });
        return newState;
    });
}
exports.asyncStateFiles = asyncStateFiles;
//# sourceMappingURL=asyncStateFile.js.map