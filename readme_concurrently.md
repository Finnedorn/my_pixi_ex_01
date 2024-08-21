<!-- concurrently e' un pacchetto che mi permette di avviare ben due comandi npm alo stesso tempo e mantenerli attivi -->
npm i concurrently --save-dev
<!-- una volta installato e' necessario settarlo nel package.json includendo i comandi che vogliamo attivare allo stesso tempo -->
"scripts": {
  "watch": "npx tsc -w",
  "dev": "npx vite",
  "start": "concurrently \"npm run watch\" \"npm run dev\""
}
<!-- successivamente e' possobile runnare il comando in terminale  -->
npm run start