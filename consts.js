export const BLOCK_SIZE = 25
export const BOARD_WIDTH = 14
export const BOARD_HEIGHT = 30
export const ISPRODUCTION = import.meta.env.MODE === 'production' ;
export const ISCELULAR = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
export const ISDESKTOP = !ISCELULAR;



export const EVENT_MOVEMENTS = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    ROTATE: 'ArrowUp',
}

