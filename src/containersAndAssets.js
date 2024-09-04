// importiamo la classe Application nativa di pixijs per inizializzare una applicazione
// importiamo le classi Assetts e Sprite per la creazione e l'upload di immagini come Sprite sull'applicazione
// importo la classe Container per generare un container
import { Application, Assets, Sprite, Container, BlurFilter, Text } from "pixi.js";



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
    
    
    // Containers --------------------------------------------------------------------------------------------------
    
    
    // un Container in Pixi js e' un elemento utilizzato per contenere altri elementi sulllo stage
    // per creare un container bastera' creare una nuova istanza di Container ed usare il metodo addChild()
    // aggiungerlo allo stage
    const charactersContainer = new Container();
    app.stage.addChild(charactersContainer);
    
    // per inserirvi elementi all'interno bastera 'usare il metodo addChild()
    // ma sul container e non piu' sullo stage
    
    // aggiungiamo due sprite
    const PsyTexture1 = await Assets.load('/image/psyduck_atti_01.png');
    const PsySprite1 = Sprite.from(PsyTexture1); 
    PsySprite1.y = 50;
    PsySprite1.scale.set(0.5);

    charactersContainer.addChild(PsySprite1);
    
    const PsyTexture2 = await Assets.load('/image/psyduck_atti_02.png');
    const PsySprite2 = Sprite.from(PsyTexture2); 
    PsySprite2.y = 150;
    PsySprite2.scale.set(0.5);
    charactersContainer.addChild(PsySprite2);

    // nota: le posizioni dei elementi sono relative al container e non allo stage !!!!
    // per conoscere le posozioni degli elementi rispetto allo stage stesso bastera' usare il metodo getGlobalPosition()
    const x = PsySprite1.getGlobalPosition().x;
    const y = PsySprite2.getGlobalPosition().y;
    // x:200, y:200
    console.log(`x: ${x}, y: ${y}`);    
    
        
    // ad un container e' possibile applicare le trasformazioni che di base hanno anche altri elementi grafici
    // tutte le trasformazioni vengono applicate anche sugli elementi figli
    // a meno che non vengano specificate per loro proprieta' differenti

    charactersContainer.x = 100; // Sposta tutto il container (e i suoi figli) a 100 pixel sull'asse X
    charactersContainer.y = 20;  // Sposta tutto il container (e i suoi figli) a 50 pixel sull'asse Y
    charactersContainer.scale.set(1.5); // Scala tutto il container di 1.5x

    
    
    // BlurFilter --------------------------------------------------------------------------------------------------
    


    // i containers sono elementi utilissimi per raggruppare elementi ma anche per applicare a questi filtri o maschere
    // esempio di filtro applicato sul container:

    // per applicare un filtro all'elemento bastera' creare una nuova istanza di BlurFilter
    const characterFilter1 = new BlurFilter();
    // e applicarla all'elemento
    PsySprite1.filters = [characterFilter1];

    const characterFilter2 = new BlurFilter();
    PsySprite2.filters = [characterFilter2];
    let count = 0;
    // aggiungiamo un ticker che applichera' questa funzione ad ogni frame
    app.ticker.add(() => {
        // incrementiamo il contatore
        count+= 0.005;
        // applichiamo un filtro la cui intensita' variera' ogni frame a seconda del contatore
        // Math.sin mi restituisce un numero compreso tra -1 e 1
        characterFilter1.blur = Math.sin(count) * 20;
        // Math.cos mi restituisce un numero compreso tra -1 e 1
        characterFilter2.blur = Math.cos(count) * 20;
    });



    // Assets --------------------------------------------------------------------------------------------------




    // abbiamo gia visto la parte Assets su texturesAndSprites.js 
    // Assets e' un oggetto di Pixijs funziona da 'archivio' per immagini, audio, video, oggetti, etc.
    // Esempio: nel caso in cui si vuole recuperare una texture per una Sprite,
    // e' necessario caricarne il formato file in Assets 

    // vi sono due metodi utilizzare Assets:

    // tramite l'utilizzo di async/await 
    const myTexture = await Assets.load('/image/psyduck_atti_01.png');
    const mySprite = Sprite.from(myTexture);
    mySprite.scale.set(0.5);
    mySprite.y = 300;
    mySprite.x = 600;
    app.stage.addChild(mySprite);

    // o tramite le promises (che non funzionera' in questo esempio visto che siamo dentro una funzione di async/await)
    // const myTexture2 = await Assets.load('/image/psyduck_atti_02.png');
    // myTexture2.then((resolvedTexture) => {
    //     const mySprite2 = Sprite.from(resolvedTexture);
    //     app.stage.addChild(mySprite2);
    // })


    // Assets sfrutta la cache del browser, pertanto dopo il caricamento, da parte dell'utente, degli elementi di gioco
    // questi non necessiteranno piu' di una chiamata per essere ottenuti dall'archivio pertanto il tutto sara' piu' veloce e fluido

    // questo pero' porta con se una problematica: nelc aso si stia usando un font che ancora l'utente non ha scaricato
    // questo potrebbe non essere visualizzato correttamente al prima caricamento della pagina in caso in cui questa carichi prima 
    // dell'eventuale download del font
    // in questi casi e' sempre meglio storare l'elemento testo in Assets
    
    const font = await Assets.load('../RedHatText-Regular.ttf');

    const text = new Text({
        text: 'Hello Pixi',
        style: {
        fill: '#ffffff',
        // font.family e' dove Assets ha storato il font
        fontFamily: font.family,
        fontSize: 72
        },
        x: 600,
        y: 600
    });

    app.stage.addChild(text);
    

    // un'altra feature di Assets e' la capacita' di creare dei pacchetti/collezioni di elementi in esso archiviati
    // questi prendono il nome di Bundles e possono essere organizzati per essere caricati in tempi uguali o differenti

    // creiamo un bundle utilizzando il metodo di Assets addBundle()
    Assets.addBundle('charachters', {
        psyduck_worried: '/public/image/psyduck_atti_03.png',
    })

    // a questo punto possiamo rievocare il bundle contenente i nostri Assets usando il metodo loadBundle()
    const characterAssets = await Assets.loadBundle('charachters');
    // e richiamiamo i nostri assets
    const PsySpriteSad = Sprite.from(characterAssets.psyduck_worried);
    PsySpriteSad.scale.set(1);
    PsySpriteSad.y = 100;
    PsySpriteSad.x = 600;
    app.stage.addChild(PsySpriteSad);

    // in progetti piu' grandi dove vi sono tantissimi Assets da caricare e' consigliabile
    // usare strutture piu' grandi: i Manifest, file json che contengono piu' bundles al loro interno

    // importiamo il nostro file Manifest
    await Assets.init({
        manifest: '/manifest/manifest.json'
    })

    // e richiamiamo i nostri assets come per i bundles
    // seleziono il bundle da cui trarre l'asset
    const myPsyAsset = await Assets.loadBundle('attitudes-second');
    // seleziono l'asset dal bundle che voglio trasformare in sprite
    const myPsySprite = Sprite.from(myPsyAsset.psyduck_04);
    myPsySprite.scale.set(1);
    myPsySprite.y = 100;
    myPsySprite.x = 700;
    // e lo aggiungo al stage
    app.stage.addChild(myPsySprite);


})();