// importiamo la classe Application nativa di pixijs per inizializzare una applicazione
// importiamo le classi Assetts e Sprites per la creazione e l'upload di immagini come sprite sull'applicazione
import { Application, Assets, Sprite } from "pixi.js";



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



    // Images, Textures and Sprites --------------------------------------------------------------------------------------------------



    // il caricamento di un'immagine su un'applicazione si compone di 3 passaggi:

    // 1) creiamo nella directory la cartella public nel quale creeremo una cartella image dove inseriremo i nostri file
    // 2) importiamo assieme ad Application pure le classi Assets e Sprite 
    // 3) uso la classe Assets (con metodo load(percorso file)) per storare i dati di un'immagine in un Texture object
    const texture = await Assets.load('/image/psyduck_atti_01.png');
    // 4) trasformiamo il Texture object in una Sprite usando il metodo from() della classe 
    const sprite = Sprite.from(texture);
    // oppure anche in questo modo:
    // const sprite = new Sprite(texture);
    // 6) piazzamo la Sprite sullo stage
    app.stage.addChild(sprite);

    // possiamo settarne la grandezza (di base avra' la stessa grandezza del file originale)
    // con width ed height
    sprite.width = 200;
    sprite.height = 200;
    // o con scale x e y (che scala l'immagine sulla base delle sue dimensioni relative)
    sprite.scale.set(1,1);
    // per posizionare la sprite
    sprite.position.set(400,300);
    sprite.anchor.set(0.5, 0.5);
    
    


})();