<!-- inizializza node bypassando tutte le domande-->
npm init -y 
<!-- installa typescript local come dev dep -->
npm i typescript --save-dev


<!-- da qui in poi tutti i comandi avranno il prefisso npx 
(ovvero il tool di npm che mi permette di usare pacchetti senza installarli globalmente)
perche' lavoro in locale, in caso di installazione globale di ts, il prefisso non occorrerebbe -->


<!-- inizializzate ts creando il file tsjson di configurazione -->
<!-- questo mi permette di far riconoscere ts dai moduli che intallero'
affinche' i pacchetti futuri e le mie estensioni non vadano mai in conflitto con esso
inoltre mi peremtte di gestire cosa e come compilare -->
npx tsc --init

<!-- check ts version -->
npx tsc -v

<!-- compilare il codie del file .ts (secondo le caratteristiche di es6) -->
<!-- demo.ts e' il nome del file esempio -->
npx tsc demo.ts --target es6
<!-- compilare due o piu' file -->
npx tsc demo.ts test.ts --target es6

<!-- attivare la watchmode del sistema di compilazione che mi permette di 
non dover ridigitare il comando da terminale ogni volta per aggiornare il file js -->
npx tsc demo.ts --target es6 -w
<!-- attivarla su piu' file specifici-->
npx tsc demo.ts test.ts --target es6 -w
<!-- attivarla su tutti -->
npx tsc -w
<!-- volendo e' possibile settarlo come script di comando dal file package.json di node
eseguibile con il comando custom npm run watch -->
"scripts": {
    "watch": "npx tsc -w"
},


<!-- merging di due o piu' file ts in un unico output file js -->
<!-- script.js e' il nome placeholder del file che vogliamo andare a creare col comando una volta eseguito -->
npx tsc demo.ts test.ts --target es6 --outFile script.js

<!-- eseguire un file tramite node ovvero eseguire la logica js sul terminale di comando -->
node script.js


<!--  -->