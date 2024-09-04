// importiamo la classe Application nativa di pixijs per inizializzare una applicazione
// importiamo le classi Assetts e Sprites per la creazione e l'upload di immagini come sprite sull'applicazione
import { Application, Assets, Sprite, Graphics } from "pixi.js";



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


    
    // Interactions --------------------------------------------------------------------------------------------------


    // pixi js ha una serie di metodi per gestire l'interazione con le applicazioni ovvero attraverso il Pointer events
    // che si dividono in due tipi: i mouse ed i touch events

    // settiamo un evento che faccia muovere l'elemento quando cliccato
    sprite.on ('pointerdown', () => {
        sprite.position.set(500,500);
    })
    // difatto pero' questo non contribuira' a sotrtire alcun effetto
    // perche di base ogni componente con pixijs e' setttato per non essere interattivo di default
    // quindi dobbiamo cambiare il setting della componente su 'static'
    sprite.eventMode = 'static';
    // inoltre per rendere la UX piu' godibile dobbiamo cambiare il modo in cui si comporta il componente quando selezionato dal pointer
    sprite.cursor = 'pointer';

    // nota: Pixijs puo settare solo interazioni che abbiano a che fare con eventi di tipo Pointer !!!
    // se si vuole settare un trigger event di qualsiasi altro tipo occorre utilizzare il normale .addEventListener() di js

    // ecco una funzione che permette di muovere l'elemento sfruttando i tasti direzionali

    window.addEventListener('keyup', function(e) {
        switch(e.key) {
          case 'ArrowRight': {
            sprite.x += 10;
            break;
          }
          case 'ArrowLeft': {
            sprite.x -= 10;
            break;
          }
          case 'ArrowUp': {
            sprite.y -= 10;
            break;
          }
          case 'ArrowDown': {
            sprite.y += 10; }
        }
    });



    // Ticker --------------------------------------------------------------------------------------------------



    // il Ticker e' un oggetto che si occupa di gestire la logica di ogni frame dell'applicazione (di default 60fps)
    // ci permette di creare animazioni frame by frame come lo spostamento di un personaggio o di un elmemento sul canvas
    // interpolando i vari frame di animazione in sequenza

    // Ticker e' un oggetto proprieta' di Application che aggiorna lo stage e le sue componenti ad un certo frame rate (numero di immagini mostrate al secondo)
    // il frame rate dipende dal monitor stesso, di base e' 60.
    // creiamo un effetto neve renderizzando ad una certa frequenza di fotogrammi tanti pallini bianchi sullo stage

    const circle = new Graphics();
    // il metodo add() chiama una callback function, tot volte al secondo, in cui definiremo cosa accade ad ogni fotogramma
    // in questo caso aggiungiamo un cerchio 60 volte al secondo  
    app.ticker.add(() => {
        // il metodo circle() crea un cerchio sullo schermo
        circle.circle(
            // con Math.random() posizioniamo l'elemento sullo schermo
            Math.random() * app.screen.width,
            Math.random() * app.screen.height,
            // di radius 5
            5
            )
        .fill({
            color: 0xffffff
        });
        app.stage.addChild(circle);
    });



})();