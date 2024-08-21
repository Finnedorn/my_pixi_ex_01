// per prima cosa creiamo la funzione che conterra' la nostra intera applicazione
// per applicazione si intende tutto cio' che all'interno della pagina del DOM e' regolato da Pixijs stesso
// e solitamente e' delimitato e circoscritto all'interno dell'elemento canvas

// importiamo la classe Application nativa di pixijs per inizializzare una applicazione
// importiamo la classe Graphics che mi permettera' di creare delle shape
import { Application, Graphics } from "pixi.js";

// in pixijs la logica che regola l'intera applicazione e' contenuta all'interno di una IIFE asincrona 
// immediately invoked function expression
(async() => {
    
    // creiamo una nuova istanza di Application con tutte le proprieta' e metodi che ne convengono
    const app = new Application();

    // inizializiamo app 
    // await poiche essendo in una funzione async vogliamo attendere 
    // che la funzione init() di app avvenga prima di procedere con gli altri passaggi
    await app.init({

        // diamo dei valori di grandezza ed altezza al canvas che conterra' l'application
        width: 1000,
        height: 800,

        // vogliamo che occupi l'intera grandezza della window? 
        // width: window.innerWidth,
        // height: window.innerHeight

        // oppure potremmo usare la proprieta' nativa di pixieJs resizeTo
        // resizeTo: window,
        // resizeTo mi permette di fittare in qualunque elemento specifico

        // vogliamo settare l'opacity del canvas? backgroundAlpha
        // backgroundAlpha: 0.8

        // possiamo cambiare pure il backgroundColor (accetta solo i codici esadecimali rgb)
        backgroundColor: 0x1099bb

        // vi e' inoltre la proprieta' antialias che ammorbidisce i contorni degli elementi nell'app
        // antialias: true (di default e' settata su false per motivi di prestazioni)

    });

    // aggiungiamo l'application canvas al body del DOM e creiamo la nostra prima applicazione! 
    document.body.appendChild(app.canvas);

    // hai settato il canvas su resizeTo window? per evitare la presenza delle barre di scorrimento verticali ed orizzontali
    // e' necessario settare il canvas su posotion absolute e lo style del body in css su margin 0 !!!
    // app.canvas.style.position = 'absolute';


    // grafiche e testo

    

})();
