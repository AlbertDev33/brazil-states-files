"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statesFilesTypescript = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const constants_1 = require("./constants/constants");
const fetchStates = async (url) => {
    const { data } = await axios_1.default.get(url);
    return data;
};
async function statesFilesTypescript() {
    let length = Object.keys(constants_1.UF).length - 1;
    const keys = Object.keys(constants_1.UF);
    while (length !== -1) {
        const uf = keys[length];
        const url = `${constants_1.IBGE_URL}/${uf}/municipios`;
        const data = await fetchStates(url);
        data.reduce((statesAcc, ibgeData) => {
            let acc = {};
            acc = statesAcc;
            const stateName = ibgeData.microrregiao.mesorregiao.UF.nome;
            const state = acc[stateName] || [];
            const city = { city: ibgeData.nome };
            state.push(city);
            acc[stateName] = state;
            const parseCities = JSON.stringify(state);
            const trimStateName = stateName.replaceAll(' ', '');
            const file = (0, fs_1.createWriteStream)(`./${stateName}.ts`);
            file.once('open', () => {
                file.write(JSON.parse(JSON.stringify(`export const ${trimStateName} = ${parseCities}`)));
                file.end();
            });
            return acc;
        }, {});
        length -= 1;
    }
}
exports.statesFilesTypescript = statesFilesTypescript;
//# sourceMappingURL=statesFilesTypescript.js.map