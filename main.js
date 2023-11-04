import './style.css'
import {BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, EVENT_MOVEMENTS, ISMOVIL, ISDESKTOP} from './consts'
import { PIECES } from './pieces'
import { SOUND } from './sounds'



// Inicializa canvas
const canvas = document.getElementById('canvas')
canvas.style.background = 'transparent'
const context = canvas.getContext('2d')
context.globalAlpha = 1;

const $score = document.getElementById('score')
const $time = document.getElementById('time')
const $buttons_movil = document.getElementById('buttons_movil')
const $game_screen = document.getElementById('game_screen')

const $body = document.querySelector('body')
const $main_screen = document.getElementById('main_screen')
const $menu_screen = document.getElementById('menu_screen')
const $btn_theme_1 = document.getElementById('btn_theme_1')
const $btn_theme_2 = document.getElementById('btn_theme_2')
const $btn_start = document.getElementById('btn_start')

$btn_start.addEventListener('click', () => {
  $menu_screen.style.display = 'none'
  $game_screen.style.display = 'grid'
  update()
  startAudio()
})

$btn_theme_1.addEventListener('click', () => {
  // se elige el tema 1
  $main_screen.style.display = 'none'
  $menu_screen.style.display = 'grid'
  if(ISDESKTOP){
    $body.style.backgroundImage = 'url("https://raw.githubusercontent.com/santiagoinostroza/tetris/main/img/db/bg.jpeg")'
  }else{
    $body.style.backgroundImage = "url('https://raw.githubusercontent.com/santiagoinostroza/tetris/main/img/db/bg_movil.avif')"
  }
  
  $body.style.backgroundSize = 'cover'
  $body.style.backgroundRepeat = 'no-repeat'
  $body.style.backgroundPosition = 'center'
})

if (ISMOVIL) {
}
if (ISDESKTOP) {
  $buttons_movil.style.display = 'none'
}

let score = 0

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)


let dropCounter = 0
let lastTime = 0

// 2 game loop
function update(time = 0) {

  // mostrar segundos
  $time.innerText = Math.floor(time / 1000)

  const deltaTime = time - lastTime
  lastTime = time
  dropCounter += deltaTime
  
  if (dropCounter > 2000) {
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
      solidifyPiece()
      removeLines()
    }
    dropCounter = 0
  }

  draw()
  window.requestAnimationFrame(update)
}

function draw() {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.strokeStyle = 'white'; 
  context.lineWidth = 0.1;

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value > 0) {
        context.fillStyle = 'green'
        context.fillRect(x, y, 1, 1)
        context.strokeStyle = 'black';
        context.strokeRect(x, y, 1, 1);
        context.strokeStyle = 'white';
      }
    })
  })

  piece.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value > 0) {
        context.fillStyle = 'blue'
        context.fillRect(piece.position.x + x, piece.position.y + y, 1, 1)
        context.strokeRect(piece.position.x + x, piece.position.y + y, 1, 1);
      
      }
    })
  })

  $score.innerText = score 
}

// 3 create board
const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT)

function createBoard(width, height) {
  return Array.from({ length: height }, () => new Array(width).fill(0))

}

// 4 create piece
const piece = {
  position: { x: 5, y: 5 },
  matrix: PIECES[Math.floor(Math.random() * PIECES.length)]
}


// 5 keyboard events and touch events
document.addEventListener('keydown', event => {
  if (event.key === EVENT_MOVEMENTS.LEFT) {
    piece.position.x--
    if (checkCollision()) {
      piece.position.x++
    }
  } else if (event.key === EVENT_MOVEMENTS.RIGHT) {
    piece.position.x++
    if (checkCollision()) {
      piece.position.x--
    }
  } else if (event.key === EVENT_MOVEMENTS.DOWN) {
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
      solidifyPiece()
      removeLines()
    }
  } else if (event.key === EVENT_MOVEMENTS.ROTATE) {
    rotate()
  }
})


const $left = document.getElementById('left');
const $right = document.getElementById('right');
const $down = document.getElementById('down');
const $rotate = document.getElementById('rotate');
let leftInterval, rightInterval, downInterval;

$left.addEventListener('touchstart', () => {
  if (!leftInterval) {
    piece.position.x--;
    if (checkCollision()) {
      piece.position.x++;
    }
    setTimeout(() => {
      leftInterval = setInterval(() => {
        piece.position.x--;
        if (checkCollision()) {
          piece.position.x++;
        }
      }, 100); // Ajusta el intervalo según tus necesidades
    }, 100);
  }
});

$left.addEventListener('touchend', () => {
  clearInterval(leftInterval);
  leftInterval = null;
});

$right.addEventListener('touchstart', () => {
  if (!rightInterval) {
    piece.position.x++;
    if (checkCollision()) {
      piece.position.x--;
    }
    setTimeout(() => {
      rightInterval = setInterval(() => {
        piece.position.x++;
        if (checkCollision()) {
          piece.position.x--;
        }
      }, 100);
    }, 100);
  }
});

$right.addEventListener('touchend', () => {
  clearInterval(rightInterval);
  rightInterval = null;
});

$down.addEventListener('touchstart', () => {
  if (!downInterval) {
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
      solidifyPiece();
      removeLines();
    }
    
    setTimeout(() => {
      downInterval = setInterval(() => {
        piece.position.y++;
        if (checkCollision()) {
          piece.position.y--;
          solidifyPiece();
          removeLines();
        }
      }, 100);
    }, 100);

  }
});

$down.addEventListener('touchend', () => {
  clearInterval(downInterval);
  downInterval = null;
});

$rotate.addEventListener('touchstart', () => {
   if (!downInterval) {
    rotate()
    setTimeout(() => {
      downInterval = setInterval(() => {
        rotate()
      }, 100);
    }, 100);
  }
});

$rotate.addEventListener('touchend', () => {
  clearInterval(downInterval);
  downInterval = null;
});




function checkCollision() {
  return piece.matrix.find((row, y) => {
    return row.find((value, x) => {
      return value !== 0 &&  board[piece.position.y + y] ?. [piece.position.x + x] !== 0
    })
  }
  )
}

function solidifyPiece() {
  piece.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value > 0) {
        board[piece.position.y + y][piece.position.x + x] = value
      }
    })
  })
  // get random piece
  piece.matrix = PIECES[Math.floor(Math.random() * PIECES.length)]
  // reset piece
  piece.position.y = 0
  piece.position.x = Math.floor((BOARD_WIDTH - piece.matrix[0].length) / 2)
  // game over
  if (checkCollision()) {
    gameOver()
    
  }
}

function gameOver() {
  SOUND.bgMusic.pause()
  SOUND.gameOverSound.play()
  alert('Game Over')
  board.forEach(row => row.fill(0))
  score = 0
  $menu_screen.style.display = 'grid'
  $game_screen.style.display = 'none'
}

function rotate() {
  const matrix = piece.matrix
  const N = matrix.length - 1
  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - j][i])
  )
  piece.matrix = result
  if (checkCollision()) {
    piece.matrix = matrix
  }
}

function removeLines() {
  const rowsToRemove = []

  board.forEach((row, y) => {
    if (row.every(value => value > 0)) {
      rowsToRemove.push(y)
    }
  })

  // Elimina todas las líneas completas en orden inverso para evitar problemas de desplazamiento
  for (let i = rowsToRemove.length - 1; i >= 0; i--) {
    board.splice(rowsToRemove[i], 1)
  }

   // Agrega nuevas líneas vacías en la parte superior del tablero para reemplazar las líneas eliminadas
   for (let i = 0; i < rowsToRemove.length; i++) {
    board.unshift(new Array(BOARD_WIDTH).fill(0))
  }

  if (rowsToRemove.length > 0) {
    score += rowsToRemove.length * 10;
    startAudioBomb()
  }else{
    startAudioClick()
  }
}

function startAudio() {
  SOUND.bgMusic.loop = true
  SOUND.bgMusic.volume = 0.1
  SOUND.bgMusic.currentTime = 0
  SOUND.bgMusic.play()
}

function startAudioBomb() {
  SOUND.removeOneLineSound.currentTime = 1
  SOUND.removeOneLineSound.volume = 1
  SOUND.removeOneLineSound.play()
}

function startAudioClick(){
  SOUND.collisionSound.currentTime = 0.2
  SOUND.collisionSound.volume = 1
  SOUND.collisionSound.play()
}
