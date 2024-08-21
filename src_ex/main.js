"use strict";
// per prima cosa creiamo la funzione che conterra' la nostra intera applicazione
// per applicazione si intende tutto cio' che all'interno della pagina del DOM e' regolato da Pixijs stesso
// e solitamente e' delimitato e circoscritto all'interno dell'elemento canvas
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// importiamo la classe Application nativa di pixijs
const pixi_js_1 = require("pixi.js");
// in pixijs la logica che regola l'intera applicazione e' contenuta all'interno di una IIFE asincrona 
// immediately invoked function expression
(() => __awaiter(void 0, void 0, void 0, function* () {
    // creiamo una nuova istanza di Application con tutte le proprieta' e metodi che ne convengono
    const app = new pixi_js_1.Application();
    // inizializiamo app 
    // await poiche essendo in una funzione async vogliamo attendere 
    // che la funzione init() di app avvenga prima di procedere con gli altri passaggi
    yield app.init({
        width: 1000,
        height: 500
    });
    // aggiungiamo l'application canvas al body del DOM
    document.body.appendChild(app.canvas);
}))();
