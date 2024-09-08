// Initialize the board with random tiles
export const init = () => {
  const board = Array.from({ length: 4 }, () => Array(4).fill(0));
  addRandomTile(board);
  addRandomTile(board); // Start with two random tiles
  return board;
};

// Add a random tile (either 2 or 4) to an empty spot on the board
export const addRandomTile = (board) => {
  const emptyTiles = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        emptyTiles.push({ x: i, y: j });
      }
    }
  }

  if (emptyTiles.length > 0) {
    const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[x][y] = Math.random() < 0.9 ? 2 : 4;
  }
};

// Move the board and handle the movement logic
export const move = (board, direction) => {
  let newBoard = JSON.parse(JSON.stringify(board));
  let score = 0;

  // Move and merge logic for a row or column
  const moveTiles = (line) => {
    const tiles = line.filter((tile) => tile !== 0); // Remove zeroes
    const mergedTiles = [];

    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] === tiles[i + 1]) {
        mergedTiles.push(tiles[i] * 2);
        score += tiles[i] * 2;
        i++; // Skip the next tile since it's merged
      } else {
        mergedTiles.push(tiles[i]);
      }
    }

    // Fill the remaining space with zeros
    while (mergedTiles.length < 4) {
      mergedTiles.push(0);
    }
    return mergedTiles;
  };

  // Handle upward movement
  const moveUp = () => {
    for (let j = 0; j < newBoard[0].length; j++) {
      const column = [];
      for (let i = 0; i < newBoard.length; i++) {
        column.push(newBoard[i][j]);
      }

      const mergedColumn = moveTiles(column);
      for (let i = 0; i < newBoard.length; i++) {
        newBoard[i][j] = mergedColumn[i];
      }
    }
  };

  // Handle downward movement
  const moveDown = () => {
    for (let j = 0; j < newBoard[0].length; j++) {
      const column = [];
      for (let i = newBoard.length - 1; i >= 0; i--) {
        column.push(newBoard[i][j]);
      }

      const mergedColumn = moveTiles(column);
      for (let i = newBoard.length - 1; i >= 0; i--) {
        newBoard[i][j] = mergedColumn[newBoard.length - 1 - i];
      }
    }
  };

  // Handle leftward movement
  const moveLeft = () => {
    for (let i = 0; i < newBoard.length; i++) {
      const mergedRow = moveTiles(newBoard[i]);
      newBoard[i] = mergedRow;
    }
  };

  // Handle rightward movement
  const moveRight = () => {
    for (let i = 0; i < newBoard.length; i++) {
      const mergedRow = moveTiles(newBoard[i].reverse()).reverse();
      newBoard[i] = mergedRow;
    }
  };

  // Move based on the direction
  switch (direction) {
    case "up":
      moveUp();
      break;
    case "down":
      moveDown();
      break;
    case "left":
      moveLeft();
      break;
    case "right":
      moveRight();
      break;
    default:
      break;
  }

  return { newBoard, score };
};

// Check if the game is over (no more moves)
export const isGameOver = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) return false; // There's an empty tile
      if (i < board.length - 1 && board[i][j] === board[i + 1][j]) return false; // Can merge down
      if (j < board[i].length - 1 && board[i][j] === board[i][j + 1])
        return false; // Can merge right
    }
  }
  return true;
};
