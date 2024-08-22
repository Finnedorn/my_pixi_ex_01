// importiamo la classe Application nativa di pixijs per inizializzare una applicazione
// importiamo la classe Graphics che mi permettera' di creare delle shape
// importiamo la classe Text per realizzare ed inserire testi nel canvas
// importiamo la classe TextStyle per estendere le proprieta' di stile ad altri elementi Text
import { Application, Graphics, Text, TextStyle } from "pixi.js";


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

    // aggiungiamo l'application canvas al body del DOM e creiamo la nostra prima applicazione! 
    document.body.appendChild(app.canvas);

    // hai settato il canvas su resizeTo window? per evitare la presenza delle barre di scorrimento verticali ed orizzontali
    // e' necessario settare il canvas su posotion absolute e lo style del body in css su margin 0 !!!
    // app.canvas.style.position = 'absolute';




    // Graphics --------------------------------------------------------------------------------------------------




    // di base la classe Graphics di Pixi offre una serie di forme preset da inserire nel canvas 
    // per creare una shape occorre prima creare una istanza di Graphics
    const rectangle = new Graphics()
    // poi usando il metodo rect(), che definisce una forma quadrangolare, e andiamo a definire la forma dall'istanza
    // i primi due paramtri sono le coordinate x ed y dell'angolo in alto a sinistra del rettangolo
    // le seconde due sono la larghezza e l'altezza
    .rect(50, 50, 200, 180)

    // per rendere il rettangolo visibile sullo stage e' necessario dargli un colore 
    // il metodo fill() e' in grado di settare tutta quella serie di style legati all'interno della shape
    .fill({
        // setto il colore
        color: 0xffea00,
        // setto l'opacita'
        alpha: 0.5
    })
    // diamogli un bordo
    .stroke({
        width: 10,
        color: 0x00ff00
    })

    // ma cos'e' lo stage? lo stage sta al canvas come il body sta all'html, in pratica e' lo spazio all'interno del canvas stesso
    // da ora in avanti tutto ci' che creeremo lo inseriremo sullo stage attrvoarso il metodo addChild() 
    app.stage.addChild(rectangle);

    // ecco altri esempi di forme create con istanze di graphics

    const line = new Graphics()
    // il metodo moveTo(x,y) setta le coordinate x ed y dal quale partire per comporre una nuova forma
    // .moveTo(300, 100)
    // il metodo lineTo(x,y) traccia una linea che connette un punto a ad un punto b 
    .lineTo(800, 500)
    .stroke({
        color: 0x55faff
    });

    // in alternativa e' possibile settare il posozionamento dell'elemento sullo stage in questo modo
    line.x = 50;
    line.y = 50;

    app.stage.addChild(line);


    const triangle = new Graphics()
    // il metodo poly() crea forme di tanti lati quanti i vertici speicificati nei parametri
    .poly([
        // ognuna di questa coppie e' un vertice, rispettivamente sulle assi x ed y 
        400, 600,
        320, 300,
        520, 350
    ])
    .fill({
        color: 0x8f5ff2
    })
    .stroke({
        color: 0xf5fa2f
    });
    app.stage.addChild(triangle);


    const star = new Graphics()
    // il metodo star() disegna una stella
    // il primi due parametri sono le coordinate x ed y sullo stage
    // il terzo il numero di punte 
    // il quarto il radius dal centro
    // il quinto lo spessore 
    .star(800, 250, 8, 100, 40)
    .fill({
        color: 0xffffff
    })
    app.stage.addChild(star);




    // Text --------------------------------------------------------------------------------------------------

    
    
    
    // vi sono 3 modi per aggiungere del testo su Pixi
    // inserire tag come h1 e p nel canvas usando tecniche di layout CSS
    // usare BitMap Text (piu' complesso)
    // o usare la classe Text


    // creiamone un'istanza
    const text = new Text({
        // la classe text ha un costruttore che accetta un elemento di tipo string
        // ovvero il testo che andremo ad inserire (di colore default nero)
        text: 'Hi Pixi',
        // la proprieta' stile funziona esattamente come il CSS pertanto ne accetta anche quasi tutte le regole
        style: {
            fill: '#ffffff',
            fontFamily: 'Montserrat',
            fontSize: 72, 
            fontStyle: 'italic',
            fontWeight: 'bold',
            stroke: {color: '#4a1850', width: 5},
            dropShadow: {
                color: '#4a1850',
                blur: 4,
                angle: Math.PI / 6,
                distance: 6,
            },
            wordWrap: true, 
            wordWrapWidth: 440
        }
    });

    text.x = 50;
    text.y = 50;

    app.stage.addChild(text);

    // e se volessi creare una serie di elementi testo tutti con la stessa proprieta' di stile ?
    // usiamo TextStyle

    // creiamo un istanza che non piazzeremo sullo stage
    // nel quale setteremo tutte le regole di stile da importare sugli altri elementi Text
    const style = new TextStyle({
        fill: '#ffffff',
        fontFamily: 'Playwrite CU',
        fontSize: 72,
        stroke: { color: '#4a1850', width: 5 },
        dropShadow: {
            color: '#4a1850',
            blur: 4,
            angle: Math.PI / 6,
            distance: 6,
        },
        wordWrap: true,
        wordWrapWidth: 440
    });

    const moreText = new Text({
        text: 'Ciao',
        // la estendo nella nuova istanza di Text 
        style
    });

    moreText.x = 500;
    moreText.y = 500;

    app.stage.addChild(moreText);
    
    // Pixijs ha un apgina creata appositamente per craftare nuovi TextStyle !!!
    // https://pixijs.io/pixi-text-style/#

})();
