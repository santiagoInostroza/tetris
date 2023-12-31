const PIECES_EASY = [
    [
        [1, 1,],
        [1, 1,],
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [1, 1, 1],
        [1, 0, 0],
        [0, 0, 0],
    ],
    [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0],
    ],
]

const PIECES_MEDIUM = [
    [
        [2, 0, 0],
        [2, 0, 0],
        [2, 2, 2]
    ],
    [
        [2, 2, 2],
        [2, 0, 2],
        [2, 0, 2]
    ],
    [
        [0, 0, 2],
        [2, 2, 2],
        [0, 0, 2]
    ],
    [
        [0, 0, 2],
        [0, 2, 2],
        [2, 2, 0]
    ],
    [
        [2, 2, 2, 2, 2],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ]

]

const PIECES_HARD = [
    [
        [3, 0, 3],
        [3, 3, 3],
        [3, 0, 3]
    ],
    [
        [0, 3, 0],
        [3, 3, 3],
        [0, 3, 0],
    ],
    [
        [3, 0, 3],
        [0, 3, 0],
        [3, 0, 3],
    ],
    
]

export const PIECES = {
    EASY: PIECES_EASY,
    MEDIUM:PIECES_EASY.concat(PIECES_MEDIUM),
    HARD: PIECES_EASY.concat(PIECES_MEDIUM).concat(PIECES_HARD)
}

export const DIFFICULTY = {
    EASY: 'EASY',
    MEDIUM: 'MEDIUM',
    HARD: 'HARD',
}


