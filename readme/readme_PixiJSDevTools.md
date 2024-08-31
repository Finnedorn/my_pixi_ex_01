<!-- PixiJs DevTools --------------------------------------------------------------------------------------------------------

Pixijs Devtools e' un'estensione di chrome che ci aiuta a visualizzare e debuggare le applications
installiamola (ferma prima il server con cntlr+C): -->
npm i @pixi/devtools --save-dev
<!-- importiamolo nel file  -->
import {initeDevtools} from '@pixi/devtools';
<!-- inizializiamo devtools con la nostra application -->
initDevtools({
  app
});
<!-- un esempio -->
import {Application} from 'pixi.js';
import {initDevtools} from '@pixi/devtools';

(async() => {
  const app = new Application();
  await app.init({
    resizeTo: window,
    antialias: true
  });

  initDevtools({
    app,
  });

  app.canvas.style.position = 'absolute';
  document.body.appendChild(app.canvas);

  // The body of the application

})();
<!-- ora nella scheda 'ispezione' di Chrome e' possibile aprire la scheda di Devtools dal simbolo delle doppie freccie -->