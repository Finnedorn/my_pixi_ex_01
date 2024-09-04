<!-- Howler e' una libreria che ci permette di inserire elementi audio alle Application e Pages
 -->

<!-- installiamola -->
npm install howler
<!-- ed importiamo la class Howl -->
import {Howl} from 'howler';
<!-- creiamo quindi un'istanza della classe Howl inserendo il source file che vogliamo riprodurre -->
const sound = new Howl({
  src: ['/Alone in the Chamber.ogg']
});
<!-- infine lanciamola con il metodo .play() -->
sound.play();

<!-- se l'audio non dovesse partire e in ispeziona dovesse venir visualizzato un messaggio di warning AudioContext
e' necessario inserire un evento per effettuare il trigger dell'audio come un click event sulla pagina -->
window.addEventListener('click', function () {
  sound.play();
});