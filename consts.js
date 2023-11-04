
const screenHeight = window.innerHeight;

export const BOARD_WIDTH = 14
export const BOARD_HEIGHT = 30
export const BLOCK_SIZE = screenHeight / BOARD_HEIGHT *0.99
export const ISPRODUCTION = import.meta.env.MODE === 'production' ;
export const ISMOVIL = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
export const ISDESKTOP = !ISMOVIL;



export const EVENT_MOVEMENTS = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    ROTATE: 'ArrowUp',
}

