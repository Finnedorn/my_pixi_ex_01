<!-- iniziamo installando vite per la gestione dei pacchetti ed il layout (come dev dependency)-->
npm i vite --save-dev
<!-- poi settiamo il comando per avviare il server (npx vite) sul nostro package.json  -->
"scripts": {
    "watch": "npx tsc -w",
    "dev": "npx vite"
},
<!-- infine avviamo il server eseguendo il comando -->
npm run dev

<!-- installiamo quindi pixijs -->
npm i pixi.js

<!-- guida basata su questa pagina: https://waelyasmina.net/articles/pixi-js-tutorial-for-complete-beginners/#filters -->