
import { ISPRODUCTION } from './consts'

const SOUNDS = {
    introSound: null,
    bgMusic: null,
    gameOverSound: null,
    removeOneLineSound: null,
    removeTwoLinesSound: null,
    removeThreeLinesSound: null,
    removeFourLinesSound: null,
    removeFiveLinesSound: null,
    collisionSound: null,

}

const canciones = Array.from({length: 10}, (_, i) => `${i + 1}.mp3`) // array de canciones del 1 al 10



let cancionActual = 0;
let theme1 = null;



export function selectTheme(theme) {
    theme1 = theme;
  if (ISPRODUCTION) {
      SOUNDS.introSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${theme}/intro.mp3`)
      SOUNDS.bgMusic = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${theme}/bg/${canciones[cancionActual]}`);
      SOUNDS.gameOverSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${theme}/gameOverSound.mp3`)
      SOUNDS.removeOneLineSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${theme}/removeOneLineSound.mp3`)
      SOUNDS.removeTwoLinesSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${theme}/removeOneLineSound.mp3`)
      SOUNDS.removeThreeLinesSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${theme}/removeOneLineSound.mp3`)
      SOUNDS.removeFourLinesSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${theme}/removeOneLineSound.mp3`)
      SOUNDS.removeFiveLinesSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${theme}/removeOneLineSound.mp3`)
      SOUNDS.collisionSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${theme}/collisionSound.mp3`)
    } else {
      SOUNDS.introSound = new Audio(`./audios/${theme}/intro.mp3`)
      SOUNDS.bgMusic = new Audio(`./audios/${theme}/bg/${canciones[cancionActual]}`);
      SOUNDS.gameOverSound = new Audio(`./audios/${theme}/gameOverSound.mp3`)
      SOUNDS.removeOneLineSound = new Audio(`./audios/${theme}/removeOneLineSound.mp3`)
      SOUNDS.removeTwoLinesSound = new Audio(`./audios/${theme}/removeOneLineSound.mp3`)
      SOUNDS.removeThreeLinesSound = new Audio(`./audios/${theme}/removeOneLineSound.mp3`)
      SOUNDS.removeFourLinesSound = new Audio(`./audios/${theme}/removeOneLineSound.mp3`)
      SOUNDS.removeFiveLinesSound = new Audio(`./audios/${theme}/removeOneLineSound.mp3`)
      SOUNDS.collisionSound = new Audio(`./audios/${theme}/collisionSound.mp3`)
    }

  }

  export function startIntroAudio() {
    SOUNDS.introSound.loop = true
    SOUNDS.introSound.play()
  }

  export function stopIntroAudio() {
    
    SOUNDS.introSound.pause()
    SOUNDS.introSound.currentTime = 0
  }


  export function startGameAudio() {
    
    SOUNDS.bgMusic.addEventListener("ended", function () {
      reproducirSiguienteCancion();
    });
    
    SOUNDS.bgMusic.play()
    .then(() => {}).catch(error => {
     
    })
          
    SOUNDS.bgMusic.addEventListener('error', function(event) {
      cancionActual = 0;
      SOUNDS.bgMusic.load();
      SOUNDS.bgMusic = new Audio(`./audios/${theme1}/bg/${canciones[cancionActual]}`);
      startGameAudio();
    });
  }

  function reproducirSiguienteCancion() {
      cancionActual++;
      SOUNDS.bgMusic.src = `./audios/${theme1}/bg/${canciones[cancionActual]}`;
      startGameAudio();
  }

  export function stopGameAudio() {
    SOUNDS.bgMusic.pause()
    SOUNDS.bgMusic.currentTime = 0
    SOUNDS.bgMusic.removeEventListener("ended", reproducirSiguienteCancion);
    SOUNDS.bgMusic.removeEventListener("error", reproducirSiguienteCancion);
  }

  export function startGameOverAudio() {
    SOUNDS.gameOverSound.play()
  }

  export function startRemoveOneLineSound() {
    SOUNDS.removeOneLineSound.currentTime = 1
    SOUNDS.removeOneLineSound.volume = 1
    SOUNDS.removeOneLineSound.play()
  }
  
  export function startCollisionSound(){
    SOUNDS.collisionSound.currentTime = 0.2
    SOUNDS.collisionSound.volume = 1
    SOUNDS.collisionSound.play()
  }