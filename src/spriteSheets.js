// importiamo la classe Application nativa di pixijs per inizializzare una applicazione
// importiamo le classi Assetts e Sprite per la creazione e l'upload di immagini come Sprite sull'applicazione
import { Application, Assets, Spritesheet, AnimatedSprite } from "pixi.js";



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
    
    
    // Spritesheets --------------------------------------------------------------------------------------------------


    // lo SpriteSheet di Pixijs permette di creare sprite che contengono diverse immagini in un unico file
    // e' un po come un elemento sprite ma contenente le animazioni del perosnaggio ed una serie di frames

    // creiamo un oggetto che conterra' tutti i dati del SpriteSheet
    // aprendo il file SpriteSheet in images puoi notare come esso sia un foglio bianco con i vari elementi all'interno
    // tutto quello che serve e' semplicemente inserire le coordinate del riquadro
    // entro al quale e' contenuto il disegno dell'elemento selezionato
    const atlasData = {
        frames: {
            // diamo un nome  aquesto frame 
          talk1: {
            // le coordinate del riquadro e la grandezza del riquadro stesso
            frame: {x: 0, y:0, w:350, h:350},
            // la grandezza del riquadro (includo lo spazio bianco)
            sourceSize: {w: 350, h: 350},
            // la posizione (in riferimento allo spazio delineato all'inizio) del disegno che ci serve 
            // delineare all'interno del riquadro (widht e height rappresentano la grandezza dell'area che ci serve)
            spriteSourceSize: {x: 0, y: 0, w: 350, h: 350}
            // nota: potrebbe sembrare complicato ma in realta' uno spritesheet professionale e' privo grossi margini
            // quindi alla fine si riduce tutto in passare le stesse w e h a tutte e 3 le proprieta' e settare (quasi)
            // sempre 0 a x ed y in spriteSourceSize
          },
          talk2: {
            frame: {x: 350, y:0, w:350, h:350},
            sourceSize: {w: 350, h: 350},
            spriteSourceSize: {x: 0, y: 0, w: 350, h: 350}
          },
          talk3: {
            frame: {x: 700, y:0, w:350, h:350 },
            sourceSize: {w: 350, h: 350},
            spriteSourceSize: {x: 0, y: 0, w: 350, h: 350}
          },
          talk4: {
            frame: {x: 1050, y:0, w:350, h:350},
            sourceSize: {w: 350, h: 350},
            spriteSourceSize: {x: 0, y: 0, w: 350, h: 350}
          },
          talk5: {
            frame: {x: 1400, y:0, w:350, h:350},
            sourceSize: {w: 350, h: 350},
            spriteSourceSize: {x: 0, y: 0, w: 350, h: 350}
          },
          walk1: {
            frame: {x: 0, y:350, w:350, h:350},
            sourceSize: {w: 350, h: 350},
            spriteSourceSize: {x: 0, y: 0, w: 350, h: 350}
          },
          walk2: {
            frame: {x: 350, y:350, w:350, h:350},
            sourceSize: {w: 350, h: 350},
            spriteSourceSize: {x: 0, y: 0, w: 350, h: 350}
          },
          walk3: {
            frame: {x: 700, y:350, w:350, h:350 },
            sourceSize: {w: 350, h: 350},
            spriteSourceSize: {x: 0, y: 0, w: 350, h: 350}
          },
          walk4: {
            frame: {x: 1050, y:350, w:350, h:350},
            sourceSize: {w: 350, h: 350},
            spriteSourceSize: {x: 0, y: 0, w: 350, h: 350}
          }
        },
        // la proprietà meta serve per riconoscere il file che ci serve per il SpriteSheet
        meta: {
          image: 'https://i.imgur.com/rjR8BeV.png',
          size: {w: 1750, h: 700}
        },
        // la proprietà animations contiene tutti i frames che componono il SpriteSheet ma divisi per animazione
        animations: {
            // l'array talk conterra' tutti quei frame che compongono la animazione di talking del personaggio   
          talk: ['talk1', 'talk2', 'talk3', 'talk4', 'talk5'],
          walk: ['walk1', 'walk2', 'walk3', 'walk4']
        }
    }

    // ora che abbiamo settato il tutto abbiamo bisogno di inizializzarlo come Asset
    const frogTexture = await Assets.load(atlasData.meta.image);
    // // e creare una nuova istanza di SpriteSheet (importiamola da inizio file)
    const frogSpriteSheet = new Spritesheet(
        frogTexture, 
        atlasData
    );
    // per applicare tutte le impostazioni precedenti settate per altasData uso il metodo parse() della classe Spritesheet
    await frogSpriteSheet.parse();

    // creiamo quindi una nuova istanza di AnimatedSprite specificando quale tra le due animazioni vogliamo richiamare
    const animatedFrog1 = new AnimatedSprite(frogSpriteSheet.animations.walk);
    // e facciamo partire l'animazione
    animatedFrog1.play();
    // impostiamo la velocità dell'animazione
    animatedFrog1.animationSpeed = 0.13;
    animatedFrog1.x = app.screen.width / 2;
    animatedFrog1.y = app.screen.height / 2;
    animatedFrog1.anchor.set(0.5);
    app.stage.addChild(animatedFrog1);

    // creiamone un'altra con la seconda animazione
    const animatedFrog2 = new AnimatedSprite(frogSpriteSheet.animations.talk);
    // e facciamo partire l'animazione
    animatedFrog2.play();
    // impostiamo la velocità dell'animazione
    animatedFrog2.animationSpeed = 0.13;
    animatedFrog2.x = 260;
    animatedFrog2.y = 390;
    animatedFrog2.anchor.set(0.5);
    app.stage.addChild(animatedFrog2);

})();