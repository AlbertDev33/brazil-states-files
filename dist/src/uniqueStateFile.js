"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueStateFile = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const constants_1 = require("./constants/constants");
const fetchStates = async (url) => {
    const { data } = await axios_1.default.get(url);
    return data;
};
async function uniqueStateFile() {
    let length = Object.keys(constants_1.UF).length - 1;
    const keys = Object.keys(constants_1.UF);
    const promise = [];
    while (length !== -1) {
        const uf = keys[length];
        const url = `${constants_1.IBGE_URL}/${uf}/municipios`;
        promise.push(fetchStates(url));
        length -= 1;
    }
    const data = await Promise.all(promise);
    const result = data.reduce((statesAcc, ibgeData) => {
        let acc = {};
        acc = statesAcc;
        ibgeData.forEach(region => {
            const stateName = region.microrregiao.mesorregiao.UF.nome;
            const state = acc[stateName] || [];
            const city = { city: region.nome };
            state.push(city);
            acc[stateName] = state;
        });
        return acc;
    }, {});
    const file = (0, fs_1.createWriteStream)(`./States.json`);
    file.once('open', () => {
        file.write(JSON.stringify(result));
        file.end();
    });
}
exports.uniqueStateFile = uniqueStateFile;
//# sourceMappingURL=uniqueStateFile.js.map