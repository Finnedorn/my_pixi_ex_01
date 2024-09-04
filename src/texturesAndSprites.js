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
    sprite.scale.x = 2;
    sprite.scale.y = 2;
    // oppure per un codice meno verboso
    sprite.scale.set(1,1);

    // per posizionare la sprite
    // come per gli altri elementi visti in precedenza
    sprite.x = 400;
    sprite.y= 300;
    // o con il camndo di posizione
    sprite.position.x = 400;
    sprite.position.y= 300;
    // oppure per un codice meno verboso
    sprite.position.set(400,300);

    // per inclinare la sprite
    // possiamo avvalerci di skew (in questo caso incliniamo solo sull'asse x)
    sprite.skew.x = Math.PI/ 4;
    // oppure per un codice meno verboso
    sprite.skew.set(Math.PI / 4, 0);

    // per ruotare la sprite
    // sprite.rotation = Math.PI / 4;
    // nota bene: la rotation in Pixijs non si ancora a partire 
    // dal centro dell'immagine ma a partire dall'angolo in alto a sinistra !!!
    // per ovviare a questa condizione vi sono due metodi:
    // settare il pivot (perno) su un valore assoluto
    sprite.pivot.set(100, 200);
    // settare un valore di anchor per la rotazione (disponibile solo per le Sprites)
    sprite.anchor.set(0.5, 0.5);

    // Attenzione: settando un pivot o un anchor per la sprite, pure la posizione base della Sprite
    // sullo Stage stessa cambiera' in quando le coordinate faranno riferimento non piu' alle impostazioni di default 
    // ovvero all'angolo in alto a sinistra dell'immagine, ma al nuovo pivot o punto di ancoraggio !!!!
 
    

})();