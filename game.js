// ============================================
// GAME CONFIGURATION
// ============================================
const DIFFICULTY_SETTINGS = {
    easy: {
        targetWinPaths: 30,
        positiveRatio: 0.65,
        minValue: -30,
        maxValue: 45
    },
    medium: {
        targetWinPaths: 20,
        positiveRatio: 0.50,
        minValue: -40,
        maxValue: 45
    },
    hard: {
        targetWinPaths: 5,
        positiveRatio: 0.35,
        minValue: -50,
        maxValue: 50
    }
};

// ============================================
// GAME STATE
// ============================================
let gameState = {
    difficulty: 'medium',
    grid: [],
    playerRow: 2,
    playerCol: 2,
    score: 100,
    movesRemaining: 10,
    moveHistory: [],
    visitedCells: new Set(),
    isGameOver: false,
    gridSeed: null
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function seededRandom(seed) {
    let state = seed;
    return function() {
        state = (state * 9301 + 49297) % 233280;
        return state / 233280;
    };
}

function cellKey(row, col) {
    return `${row},${col}`;
}

// ============================================
// GRID GENERATION
// ============================================

function generateGrid(difficulty, seed) {
    const settings = DIFFICULTY_SETTINGS[difficulty];
    const random = seededRandom(seed);
    const grid = [];
    
    // Initialize 5x5 grid
    for (let i = 0; i < 5; i++) {
        const row = [];
        for (let j = 0; j < 5; j++) {
            // Starting position (center) is always 0
            if (i === 2 && j === 2) {
                row.push(0);
            } else {
                // Generate random value based on difficulty
                const isPositive = random() < settings.positiveRatio;
                let value;
                
                if (isPositive) {
                    // Positive value
                    value = Math.floor(random() * (settings.maxValue - 10)) + 10;
                } else {
                    // Negative value
                    const range = Math.abs(settings.minValue) - 10;
                    value = -(Math.floor(random() * range) + 10);
                }
                
                row.push(value);
            }
        }
        grid.push(row);
    }
    
    return grid;
}

// ============================================
// GAME INITIALIZATION
// ============================================

function selectDifficulty(difficulty) {
    gameState.difficulty = difficulty;
    
    // Update button states
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.difficulty === difficulty) {
            btn.classList.add('active');
        }
    });
    
    // Start new game with selected difficulty
    newGame();
}

function newGame() {
    // Generate new seed
    gameState.gridSeed = Date.now();
    
    // Generate grid
    gameState.grid = generateGrid(gameState.difficulty, gameState.gridSeed);
    
    // Reset game state
    gameState.playerRow = 2;
    gameState.playerCol = 2;
    gameState.score = 100;
    gameState.movesRemaining = 10;
    gameState.moveHistory = [];
    gameState.visitedCells = new Set();
    gameState.visitedCells.add(cellKey(2, 2));
    gameState.isGameOver = false;
    
    // Update display
    renderGrid();
    updateStats();
    updateControls();
    
    // Show end game button
    document.getElementById('endBtn').style.display = 'inline-block';
}

// ============================================
// RENDERING
// ============================================

function renderGrid() {
    const gridContainer = document.getElementById('gameGrid');
    gridContainer.innerHTML = '';
    
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            
            const value = gameState.grid[row][col];
            
            // Show value if not visited and not current position
            const isCurrentPos = (row === gameState.playerRow && col === gameState.playerCol);
            const isVisited = gameState.visitedCells.has(cellKey(row, col)) && !isCurrentPos;
            
            if (!isCurrentPos && !isVisited) {
                // Show the number
                if (value > 0) {
                    cell.textContent = '+' + value;
                    cell.classList.add('positive');
                } else if (value < 0) {
                    cell.textContent = value;
                    cell.classList.add('negative');
                } else {
                    cell.textContent = '0';
                }
            }
            
            // Mark current player position
            if (isCurrentPos) {
                cell.classList.add('player-position');
            }
            
            // Mark visited cells
            if (isVisited) {
                cell.classList.add('visited');
                
                // Add move number for visited cells
                const moveIndex = gameState.moveHistory.findIndex(
                    m => m.row === row && m.col === col
                );
                if (moveIndex !== -1) {
                    const marker = document.createElement('div');
                    marker.className = 'move-marker';
                    marker.textContent = moveIndex + 1;
                    cell.appendChild(marker);
                }
            }
            
            gridContainer.appendChild(cell);
        }
    }
}

function updateStats() {
    document.getElementById('scoreDisplay').textContent = gameState.score;
    document.getElementById('movesDisplay').textContent = gameState.movesRemaining;
    document.getElementById('moveNumberDisplay').textContent = gameState.moveHistory.length;
}

function updateControls() {
    const { playerRow, playerCol, isGameOver } = gameState;
    
    document.getElementById('upBtn').disabled = playerRow === 0 || isGameOver;
    document.getElementById('downBtn').disabled = playerRow === 4 || isGameOver;
    document.getElementById('leftBtn').disabled = playerCol === 0 || isGameOver;
    document.getElementById('rightBtn').disabled = playerCol === 4 || isGameOver;
}

// ============================================
// GAME LOGIC
// ============================================

function makeMove(direction) {
    if (gameState.isGameOver || gameState.movesRemaining === 0) return;
    
    let newRow = gameState.playerRow;
    let newCol = gameState.playerCol;
    
    switch (direction) {
        case 'up': newRow--; break;
        case 'down': newRow++; break;
        case 'left': newCol--; break;
        case 'right': newCol++; break;
    }
    
    // Check boundaries
    if (newRow < 0 || newRow > 4 || newCol < 0 || newCol > 4) return;
    
    // Get tile value
    const tileValue = gameState.grid[newRow][newCol];
    
    // Update score
    gameState.score += tileValue;
    
    // Update position
    gameState.playerRow = newRow;
    gameState.playerCol = newCol;
    
    // Record move
    gameState.moveHistory.push({
        row: newRow,
        col: newCol,
        value: tileValue,
        direction: direction
    });
    
    // Mark as visited
    gameState.visitedCells.add(cellKey(newRow, newCol));
    
    // Decrease moves
    gameState.movesRemaining--;
    
    // Update display
    renderGrid();
    updateStats();
    updateControls();
    
    // Check if game over
    if (gameState.movesRemaining === 0) {
        finishGame();
    }
}

function endGameManually() {
    if (gameState.moveHistory.length === 0) {
        alert('Make at least one move before ending the game!');
        return;
    }
    finishGame();
}

// ============================================
// OPTIMAL PATH CALCULATION
// ============================================

function calculateOptimalPath() {
    const grid = gameState.grid;
    let bestScore = -Infinity;
    let bestPath = [];
    
    function explorePath(row, col, currentScore, movesLeft, path) {
        if (movesLeft === 0) {
            if (currentScore > bestScore) {
                bestScore = currentScore;
                bestPath = [...path];
            }
            return;
        }
        
        const moves = [
            { dr: -1, dc: 0 }, // up
            { dr: 1, dc: 0 },  // down
            { dr: 0, dc: -1 }, // left
            { dr: 0, dc: 1 }   // right
        ];
        
        for (const move of moves) {
            const newRow = row + move.dr;
            const newCol = col + move.dc;
            
            if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
                const newScore = currentScore + grid[newRow][newCol];
                path.push({ row: newRow, col: newCol, value: grid[newRow][newCol] });
                explorePath(newRow, newCol, newScore, movesLeft - 1, path);
                path.pop();
            }
        }
    }
    
    explorePath(2, 2, 100, 10, []);
    
    return {
        score: bestScore,
        path: bestPath
    };
}

function findWorstMove() {
    if (gameState.moveHistory.length === 0) return -1;
    
    let worstMoveIndex = -1;
    let maxImpact = 0;
    
    // Simple heuristic: find the move with the worst value
    gameState.moveHistory.forEach((move, index) => {
        const impact = Math.abs(move.value);
        if (move.value < 0 && impact > maxImpact) {
            maxImpact = impact;
            worstMoveIndex = index;
        }
    });
    
    return worstMoveIndex;
}

// ============================================
// GAME END
// ============================================

function finishGame() {
    gameState.isGameOver = true;
    updateControls();
    
    // Calculate optimal solution
    const optimal = calculateOptimalPath();
    const worstMoveIndex = findWorstMove();
    
    // Show results
    showResults(optimal, worstMoveIndex);
}

function showResults(optimal, worstMoveIndex) {
    const modal = document.getElementById('resultsModal');
    const finalScore = gameState.score;
    const optimalScore = optimal.score;
    const gap = Math.abs(optimalScore - finalScore);
    const isPerfect = finalScore === optimalScore;
    
    // Update result displays
    document.getElementById('finalScoreDisplay').textContent = finalScore;
    document.getElementById('optimalScoreDisplay').textContent = optimalScore;
    document.getElementById('gapScoreDisplay').textContent = gap;
    
    // Analysis text
    const analysisBox = document.getElementById('analysisBox');
    const analysisText = document.getElementById('analysisText');
    const difficultyName = gameState.difficulty.toUpperCase();
    const targetPaths = DIFFICULTY_SETTINGS[gameState.difficulty].targetWinPaths;
    
    if (isPerfect) {
        analysisBox.classList.add('perfect');
        analysisText.innerHTML = `🎯 <span class="highlight perfect">PERFECT GAME!</span><br>You found an optimal path!<br><small style="opacity: 0.8;">${difficultyName} Mode - ${targetPaths} winning patterns</small>`;
        document.getElementById('replayBtn').style.display = 'none';
    } else {
        analysisBox.classList.remove('perfect');
        if (worstMoveIndex !== -1) {
            const moveNum = worstMoveIndex + 1;
            analysisText.innerHTML = `You missed the optimal score by <span class="highlight error">${gap} points</span><br>Critical mistake at <span class="highlight">Move #${moveNum}</span><br><small style="opacity: 0.8;">${difficultyName} Mode - ${targetPaths} winning patterns</small>`;
            document.getElementById('replayMoveNum').textContent = worstMoveIndex;
            document.getElementById('replayBtn').style.display = 'block';
        } else {
            analysisText.innerHTML = `You were <span class="highlight">${gap} points</span> away from perfection<br><small style="opacity: 0.8;">${difficultyName} Mode - ${targetPaths} winning patterns</small>`;
            document.getElementById('replayBtn').style.display = 'none';
        }
    }
    
    // Share text
    const shareText = `🎮 ONE MORE MOVE - ${difficultyName}

My Score: ${finalScore}
Optimal: ${optimalScore}
Difference: ${gap} points

Only ${targetPaths} winning patterns exist!
Can you beat my score?`;
    
    document.getElementById('shareContent').textContent = shareText;
    
    // Show modal
    modal.classList.add('active');
}

function closeResultsModal() {
    document.getElementById('resultsModal').classList.remove('active');
}

function replayGame() {
    const replayIndex = parseInt(document.getElementById('replayMoveNum').textContent);
    closeResultsModal();
    
    // Reset to state before the mistake
    const savedSeed = gameState.gridSeed;
    const savedDifficulty = gameState.difficulty;
    const savedHistory = [...gameState.moveHistory];
    
    // Reinitialize
    gameState.gridSeed = savedSeed;
    gameState.grid = generateGrid(savedDifficulty, savedSeed);
    gameState.playerRow = 2;
    gameState.playerCol = 2;
    gameState.score = 100;
    gameState.movesRemaining = 10;
    gameState.moveHistory = [];
    gameState.visitedCells = new Set();
    gameState.visitedCells.add(cellKey(2, 2));
    gameState.isGameOver = false;
    
    // Replay moves up to the mistake
    for (let i = 0; i < replayIndex && i < savedHistory.length; i++) {
        makeMove(savedHistory[i].direction);
    }
}

function copyShareText() {
    const shareText = document.getElementById('shareContent').textContent;
    navigator.clipboard.writeText(shareText).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        alert('Failed to copy. Please copy manually.');
    });
}

// ============================================
// KEYBOARD CONTROLS
// ============================================

document.addEventListener('keydown', (e) => {
    if (gameState.isGameOver) return;
    
    const key = e.key.toLowerCase();
    
    if (key === 'arrowup' || key === 'w') {
        e.preventDefault();
        makeMove('up');
    } else if (key === 'arrowdown' || key === 's') {
        e.preventDefault();
        makeMove('down');
    } else if (key === 'arrowleft' || key === 'a') {
        e.preventDefault();
        makeMove('left');
    } else if (key === 'arrowright' || key === 'd') {
        e.preventDefault();
        makeMove('right');
    }
});

// ============================================
// INITIALIZE GAME ON LOAD
// ============================================

window.addEventListener('load', () => {
    newGame();
});