import './style.css'
import {BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, EVENT_MOVEMENTS } from './consts'

// Inicializa canvas
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const $score = document.getElementById('score')
const $time = document.getElementById('time')
const $title = document.getElementById('title')
const game = document.getElementById('game')

const audio = new Audio('/audios/db.mp3')
const audioGameOver = new Audio('/audios/audioGameOver.mp3')
const audioBomb = new Audio('/audios/bomba2.mp3')
const audioClick = new Audio('/audios/click.mp3')

// const audio = new Audio('https://raw.githubusercontent.com/santiagoInostroza/tetris/audios/db.mp3');
// const audioGameOver = new Audio('https://raw.githubusercontent.com/santiagoInostroza/tetris/audios/audioGameOver.mp3');
// const audioBomb = new Audio('https://raw.githubusercontent.com/santiagoInostroza/tetris/audios/bomba2.mp3');
// const audioClick = new Audio('https://raw.githubusercontent.com/santiagoInostroza/tetris/audios/click.mp3');

let score = 0

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

// 2 game loop
// function update() {
//   draw()
//   window.requestAnimationFrame(update)
// }

let dropCounter = 0
let lastTime = 0



function update(time = 0) {
  
  // mostrar solo segundos
  $time.innerText = Math.floor(time / 1000)
  const deltaTime = time - lastTime
  lastTime = time

  dropCounter += deltaTime
  if (dropCounter > 1000) {
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
  matrix: [
    [1, 1,],
    [1, 1,],
  ],
}

const pieces = [
  [
    [1, 1,],
    [1, 1,],
  ],
  [
    [0, 2, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  [
    [3, 3, 0],
    [0, 3, 3],
    [0, 0, 0],
  ],
  [
    [0, 4, 4],
    [4, 4, 0],
    [0, 0, 0],
  ],
  [
    [5, 5, 5, 5],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
    [
      [0, 6, 0],
      [6, 6, 6],
      [0, 6, 0],
    ],
    [
      [7, 7, 7],
      [7, 0, 0],
      [0, 0, 0],
    ],
    [
      [8, 0, 0],
      [8, 0, 0,],
      [8, 8, 8]
    ],
    [
      [9, 9, 9],
      [9, 0, 9],
      [9, 0, 9]
    ],
    [
      [0, 0, 10],
      [10, 10, 10],
      [0, 0, 10]
    ],
    [
      [0, 0, 11],
      [0, 11, 11],
      [11, 11, 0]
    ]
]

// 5 keyboard events
document.addEventListener('keydown', event => {
  if (event.key === EVENT_MOVEMENTS.LEFT) {
    piece.position.x--
    if (checkCollision()) {
      piece.position.x++
    }
  } else if (event.key === EVENT_MOVEMENTS.RIGHT) {
    piece.position.x++
    console.log(checkCollision()) 
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
  piece.matrix = pieces[Math.floor(Math.random() * pieces.length)]
  // reset piece
  piece.position.y = 0
  piece.position.x = Math.floor((BOARD_WIDTH - piece.matrix[0].length) / 2)
  // game over
  if (checkCollision()) {
    gameOver()
    
  }
}

function gameOver() {
  audio.pause()
  audio.currentTime = 0
  audioGameOver.play()
  alert('Game Over')
  board.forEach(row => row.fill(0))
  score = 0
  $title.style.display = 'grid'
  game.style.display = 'none'
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
  audio.loop = true
  audio.volume = 0.1
  audio.play()
}

function startAudioBomb() {
  audioBomb.currentTime = 1
  audioBomb.volume = 1
  audioBomb.play()
}

function startAudioClick(){
  audioClick.currentTime = 0.2
  audioClick.volume = 1
  audioClick.play()
}

$title.addEventListener('click', () => {
  $title.style.display = 'none'
  game.style.display = 'grid'
  update()
  startAudio()
})
