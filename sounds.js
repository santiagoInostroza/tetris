
import { ISPRODUCTION } from './consts'

export const SOUND = {
    bgMusic: null,
    gameOverSound: null,
    removeOneLineSound: null,
    removeTwoLinesSound: null,
    removeThreeLinesSound: null,
    removeFourLinesSound: null,
    removeFiveLinesSound: null,
    collisionSound: null,

}

let tematica = 'db'


if (ISPRODUCTION) {
    SOUND.bgMusic = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${tematica}/bgMusic.mp3`)
    SOUND.gameOverSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${tematica}/gameOverSound.mp3`)
    SOUND.removeOneLineSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${tematica}/removeOneLineSound.mp3`)
    SOUND.removeTwoLinesSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${tematica}/removeOneLineSound.mp3`)
    SOUND.removeThreeLinesSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${tematica}/removeOneLineSound.mp3`)
    SOUND.removeFourLinesSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${tematica}/removeOneLineSound.mp3`)
    SOUND.removeFiveLinesSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${tematica}/removeOneLineSound.mp3`)
    SOUND.collisionSound = new Audio(`https://raw.githubusercontent.com/santiagoinostroza/tetris/main/audios/${tematica}/collisionSound.mp3`)
  } else {
    SOUND.bgMusic = new Audio(`./audios/${tematica}/bgMusic.mp3`)
    SOUND.gameOverSound = new Audio(`./audios/${tematica}/gameOverSound.mp3`)
    SOUND.removeOneLineSound = new Audio(`./audios/${tematica}/removeOneLineSound.mp3`)
    SOUND.removeTwoLinesSound = new Audio(`./audios/${tematica}/removeOneLineSound.mp3`)
    SOUND.removeThreeLinesSound = new Audio(`./audios/${tematica}/removeOneLineSound.mp3`)
    SOUND.removeFourLinesSound = new Audio(`./audios/${tematica}/removeOneLineSound.mp3`)
    SOUND.removeFiveLinesSound = new Audio(`./audios/${tematica}/removeOneLineSound.mp3`)
    SOUND.collisionSound = new Audio(`./audios/${tematica}/collisionSound.mp3`)
  }