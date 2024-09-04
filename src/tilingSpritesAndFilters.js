// importiamo la classe Application nativa di pixijs per inizializzare una applicazione
// importiamo la classe TilingSprite per la creazione di infiniti background 
import { Application, Assets, TilingSprite, BlurFilter, NoiseFilter } from "pixi.js";



// per prima cosa creiamo la funzione che conterra' la nostra intera applicazione
// per applicazione si intende tutto cio' che all'interno della pagina del DOM e' regolato da Pixijs stesso
// e solitamente e' delimitato e circoscritto all'interno dell'elemento canvas

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

        // possiamo cambiare pure il backgroundColor (accetta solo i codici esadecimali rgb)
        backgroundColor: 0x1099bb

    });

    // impostiamo la variabile globale che conterra' l'istanza dell'application
    globalThis.__PIXI_APP__ = app;

    // aggiungiamo l'application canvas al body del DOM e creiamo la nostra prima applicazione! 
    document.body.appendChild(app.canvas);
    
    
    // TilingSprites --------------------------------------------------------------------------------------------------


    // la tilingSprite e' uno speciale tipo di sprite usato per la creazione di background infiniti
    // carichiamo una texture
    const texture = await Assets.load("/image/psyduck_atti_01.png");
    // creiamo una tilingSprite con la texture appena creata, specificandone la larghezza e l'altezza
    const tilingSprite = new TilingSprite({
        texture, 
        width:1000, 
        height:800
    });
    app.stage.addChild(tilingSprite);

    app.ticker.add(() => {
        // Esempio di movimento orizzontale continuo
        tilingSprite.tilePosition.x += 1;
    });



    // Filters --------------------------------------------------------------------------------------------------



    // pixi ci da la possibilita' che puoi applicare diversi filtri ai vari elementi del canvas
    // per applicare un filtro all'elemento tilingSprite bastera' creare una nuova istanza di BlurFilter 
    tilingSprite.filters = new BlurFilter({

        strength: 3
    });

    // e' inoltre possobile applicare piu' filtri contemporaneamente
    tilingSprite.filters = [
        new BlurFilter({strength: 3}),
        new NoiseFilter({noise: 0.2})
    ];

})();