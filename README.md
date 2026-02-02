<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ONE MORE MOVE - Strategic Puzzle Game</title>
    <meta name="description" content="A minimalist strategy game about perfect decisions. Every move matters. Can you find the optimal path?">
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            /* Professional Color Palette */
            --bg-main: #0f172a;
            --bg-secondary: #1e293b;
            --bg-card: #334155;
            --bg-hover: #475569;
            
            --primary-blue: #3b82f6;
            --primary-blue-light: #60a5fa;
            --primary-blue-dark: #2563eb;
            
            --accent-green: #10b981;
            --accent-red: #ef4444;
            --accent-yellow: #f59e0b;
            
            --text-primary: #f1f5f9;
            --text-secondary: #cbd5e1;
            --text-muted: #94a3b8;
            
            --border-color: #475569;
            --glow-blue: rgba(59, 130, 246, 0.4);
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: var(--text-primary);
            min-height: 100vh;
            padding: 20px;
            position: relative;
            overflow-x: hidden;
            overflow-y: auto;
        }
        
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
            pointer-events: none;
            z-index: 0;
        }
        
        .container {
            max-width: 650px;
            width: 100%;
            margin: 0 auto;
            position: relative;
            z-index: 1;
            padding-bottom: 40px;
        }
        
        /* Header */
        .header {
            text-align: center;
            margin-bottom: 30px;
            animation: slideDown 0.6s ease-out;
        }
        
        .title {
            font-size: clamp(2rem, 8vw, 4rem);
            font-weight: 800;
            letter-spacing: -0.03em;
            background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: clamp(0.85rem, 3vw, 1rem);
            color: var(--text-secondary);
            font-weight: 400;
        }
        
        /* Difficulty Selector */
        .difficulty-section {
            background: var(--bg-secondary);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 24px;
            border: 1px solid var(--border-color);
            animation: fadeIn 0.6s ease-out 0.1s both;
        }
        
        .difficulty-label {
            font-size: 0.85rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 16px;
            text-align: center;
            font-weight: 600;
        }
        
        .difficulty-buttons {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }
        
        .diff-btn {
            background: var(--bg-card);
            border: 2px solid var(--border-color);
            color: var(--text-secondary);
            padding: 14px 8px;
            border-radius: 12px;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-align: center;
        }
        
        .diff-btn:hover {
            background: var(--bg-hover);
            border-color: var(--primary-blue);
            transform: translateY(-2px);
        }
        
        .diff-btn.active {
            background: var(--primary-blue);
            border-color: var(--primary-blue);
            color: white;
            box-shadow: 0 4px 20px var(--glow-blue);
        }
        
        .diff-btn .diff-name {
            display: block;
            font-size: clamp(0.9rem, 3vw, 1rem);
            margin-bottom: 4px;
        }
        
        .diff-btn .diff-info {
            display: block;
            font-size: clamp(0.7rem, 2.5vw, 0.75rem);
            opacity: 0.8;
            font-weight: 400;
        }
        
        /* Stats Bar */
        .stats-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 24px;
            animation: fadeIn 0.6s ease-out 0.2s both;
        }
        
        .stat-box {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 16px;
            text-align: center;
        }
        
        .stat-label {
            font-size: clamp(0.7rem, 2.5vw, 0.75rem);
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 8px;
            font-weight: 600;
        }
        
        .stat-value {
            font-family: 'Space Mono', monospace;
            font-size: clamp(1.5rem, 5vw, 2rem);
            font-weight: 700;
            color: var(--text-primary);
        }
        
        .stat-value.score-display {
            color: var(--primary-blue-light);
        }
        
        /* Game Board */
        .game-container {
            background: var(--bg-secondary);
            border-radius: 16px;
            padding: clamp(16px, 4vw, 28px);
            border: 1px solid var(--border-color);
            margin-bottom: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            animation: fadeIn 0.6s ease-out 0.3s both;
        }
        
        .grid-container {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: clamp(6px, 2vw, 10px);
            margin-bottom: 24px;
        }
        
        .grid-cell {
            aspect-ratio: 1;
            background: var(--bg-card);
            border: 2px solid var(--border-color);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Space Mono', monospace;
            font-size: clamp(0.9rem, 3vw, 1.1rem);
            font-weight: 700;
            transition: all 0.2s ease;
            position: relative;
            cursor: default;
            color: var(--text-primary);
        }
        
        .grid-cell.positive {
            color: var(--accent-green);
            background: rgba(16, 185, 129, 0.1);
        }
        
        .grid-cell.negative {
            color: var(--accent-red);
            background: rgba(239, 68, 68, 0.1);
        }
        
        .grid-cell.player-position {
            background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-light) 100%);
            border-color: var(--primary-blue-light);
            box-shadow: 0 0 25px var(--glow-blue);
            animation: playerPulse 2s ease-in-out infinite;
            color: transparent !important;
        }
        
        .grid-cell.visited {
            background: rgba(59, 130, 246, 0.15);
            border-color: var(--primary-blue);
            color: transparent !important;
        }
        
        .move-marker {
            position: absolute;
            top: 4px;
            right: 4px;
            background: rgba(0, 0, 0, 0.7);
            color: var(--primary-blue-light);
            font-size: clamp(0.6rem, 2vw, 0.65rem);
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 700;
        }
        
        /* Controls */
        .controls-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
        }
        
        .arrow-grid {
            display: grid;
            grid-template-areas:
                ". up ."
                "left down right";
            gap: clamp(8px, 2vw, 10px);
            width: fit-content;
        }
        
        .arrow-btn {
            width: clamp(55px, 15vw, 70px);
            height: clamp(55px, 15vw, 70px);
            background: var(--bg-card);
            border: 2px solid var(--border-color);
            border-radius: 12px;
            color: var(--text-primary);
            font-size: clamp(1.4rem, 4vw, 1.8rem);
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .arrow-btn:hover:not(:disabled) {
            background: var(--primary-blue);
            border-color: var(--primary-blue);
            transform: scale(1.05);
            box-shadow: 0 4px 15px var(--glow-blue);
        }
        
        .arrow-btn:active:not(:disabled) {
            transform: scale(0.95);
        }
        
        .arrow-btn:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }
        
        .arrow-btn.up { grid-area: up; }
        .arrow-btn.left { grid-area: left; }
        .arrow-btn.down { grid-area: down; }
        .arrow-btn.right { grid-area: right; }
        
        .keyboard-hint {
            font-size: clamp(0.75rem, 2.5vw, 0.8rem);
            color: var(--text-muted);
            text-align: center;
            margin-top: 8px;
        }
        
        /* Action Buttons */
        .action-buttons {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        
        .btn {
            flex: 1;
            padding: clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px);
            border: none;
            border-radius: 12px;
            font-family: 'Inter', sans-serif;
            font-size: clamp(0.85rem, 3vw, 1rem);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-light) 100%);
            color: white;
            border: 2px solid transparent;
            box-shadow: 0 4px 15px var(--glow-blue);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px var(--glow-blue);
        }
        
        .btn-secondary {
            background: var(--bg-card);
            color: var(--text-primary);
            border: 2px solid var(--border-color);
        }
        
        .btn-secondary:hover {
            background: var(--bg-hover);
            border-color: var(--primary-blue);
        }
        
        /* Modal */
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(8px);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 20px;
            overflow-y: auto;
        }
        
        .modal-overlay.active {
            display: flex;
            animation: fadeIn 0.3s ease-out;
        }
        
        .modal-content {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            max-width: 520px;
            width: 100%;
            padding: clamp(24px, 6vw, 40px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: modalSlideIn 0.4s ease-out;
            margin: auto;
        }
        
        .modal-header {
            text-align: center;
            margin-bottom: 24px;
        }
        
        .modal-title {
            font-size: clamp(1.8rem, 6vw, 2.2rem);
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-light) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 8px;
        }
        
        .modal-subtitle {
            color: var(--text-secondary);
            font-size: clamp(0.85rem, 3vw, 0.95rem);
        }
        
        .results-grid {
            display: grid;
            gap: 12px;
            margin-bottom: 24px;
        }
        
        .result-card {
            background: var(--bg-card);
            padding: 16px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            text-align: center;
        }
        
        .result-label {
            font-size: clamp(0.75rem, 2.5vw, 0.8rem);
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 8px;
            font-weight: 600;
        }
        
        .result-value {
            font-family: 'Space Mono', monospace;
            font-size: clamp(2rem, 7vw, 2.8rem);
            font-weight: 700;
            color: var(--text-primary);
        }
        
        .result-value.your-score {
            color: var(--primary-blue-light);
        }
        
        .result-value.optimal-score {
            color: var(--accent-green);
        }
        
        .result-value.gap-score {
            color: var(--accent-red);
        }
        
        .analysis-box {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(96, 165, 250, 0.1) 100%);
            border: 2px solid var(--primary-blue);
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .analysis-box.perfect {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%);
            border-color: var(--accent-green);
        }
        
        .analysis-text {
            font-size: clamp(1rem, 3.5vw, 1.15rem);
            line-height: 1.6;
            color: var(--text-primary);
        }
        
        .highlight {
            color: var(--primary-blue-light);
            font-weight: 700;
        }
        
        .highlight.perfect {
            color: var(--accent-green);
        }
        
        .highlight.error {
            color: var(--accent-red);
        }
        
        .share-section {
            background: var(--bg-main);
            padding: 16px;
            border-radius: 12px;
            border: 2px dashed var(--border-color);
            margin-bottom: 20px;
        }
        
        .share-content {
            font-family: 'Space Mono', monospace;
            font-size: clamp(0.8rem, 2.8vw, 0.9rem);
            line-height: 1.8;
            color: var(--text-secondary);
            text-align: center;
            margin-bottom: 12px;
            white-space: pre-line;
        }
        
        .copy-button {
            width: 100%;
            padding: 12px;
            background: var(--bg-card);
            color: var(--primary-blue-light);
            border: 1px solid var(--primary-blue);
            border-radius: 8px;
            font-size: clamp(0.85rem, 3vw, 0.9rem);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .copy-button:hover {
            background: var(--primary-blue);
            color: white;
        }
        
        .modal-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        /* Animations */
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(40px) scale(0.96);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes playerPulse {
            0%, 100% {
                box-shadow: 0 0 25px var(--glow-blue);
            }
            50% {
                box-shadow: 0 0 40px var(--glow-blue);
            }
        }
        
        /* Responsive - Tablet */
        @media (max-width: 768px) {
            .modal-actions {
                flex-direction: column;
            }
        }
        
        /* Responsive - Mobile */
        @media (max-width: 480px) {
            body {
                padding: 10px;
            }
            
            .difficulty-buttons {
                gap: 8px;
            }
            
            .stats-container {
                gap: 8px;
            }
            
            .grid-container {
                gap: 6px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1 class="title">ONE MORE MOVE</h1>
            <p class="subtitle">Find the perfect path through strategic decisions</p>
        </div>
        
        <!-- Difficulty Selection -->
        <div class="difficulty-section">
            <div class="difficulty-label">Select Difficulty</div>
            <div class="difficulty-buttons">
                <button class="diff-btn" data-difficulty="easy" onclick="selectDifficulty('easy')">
                    <span class="diff-name">EASY</span>
                    <span class="diff-info">30 win paths</span>
                </button>
                <button class="diff-btn active" data-difficulty="medium" onclick="selectDifficulty('medium')">
                    <span class="diff-name">MEDIUM</span>
                    <span class="diff-info">20 win paths</span>
                </button>
                <button class="diff-btn" data-difficulty="hard" onclick="selectDifficulty('hard')">
                    <span class="diff-name">HARD</span>
                    <span class="diff-info">5 win paths</span>
                </button>
            </div>
        </div>
        
        <!-- Stats -->
        <div class="stats-container">
            <div class="stat-box">
                <div class="stat-label">Score</div>
                <div class="stat-value score-display" id="scoreDisplay">100</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Moves Left</div>
                <div class="stat-value" id="movesDisplay">10</div>
            </div>
            <div class="stat-box">
                <div class="stat-label">Move #</div>
                <div class="stat-value" id="moveNumberDisplay">0</div>
            </div>
        </div>
        
        <!-- Game Board -->
        <div class="game-container">
            <div class="grid-container" id="gameGrid"></div>
            
            <div class="controls-section">
                <div class="arrow-grid">
                    <button class="arrow-btn up" id="upBtn" onclick="makeMove('up')">↑</button>
                    <button class="arrow-btn left" id="leftBtn" onclick="makeMove('left')">←</button>
                    <button class="arrow-btn down" id="downBtn" onclick="makeMove('down')">↓</button>
                    <button class="arrow-btn right" id="rightBtn" onclick="makeMove('right')">→</button>
                </div>
                <div class="keyboard-hint">Use arrow keys or WASD to move</div>
            </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="action-buttons">
            <button class="btn btn-secondary" onclick="newGame()">New Game</button>
            <button class="btn btn-primary" id="endBtn" onclick="endGameManually()" style="display: none;">End Game</button>
        </div>
    </div>
    
    <!-- Results Modal -->
    <div class="modal-overlay" id="resultsModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Game Over</h2>
                <p class="modal-subtitle">Performance Analysis</p>
            </div>
            
            <div class="results-grid">
                <div class="result-card">
                    <div class="result-label">Your Score</div>
                    <div class="result-value your-score" id="finalScoreDisplay">0</div>
                </div>
                <div class="result-card">
                    <div class="result-label">Optimal Score</div>
                    <div class="result-value optimal-score" id="optimalScoreDisplay">0</div>
                </div>
                <div class="result-card">
                    <div class="result-label">Difference</div>
                    <div class="result-value gap-score" id="gapScoreDisplay">0</div>
                </div>
            </div>
            
            <div class="analysis-box" id="analysisBox">
                <p class="analysis-text" id="analysisText"></p>
            </div>
            
            <div class="share-section">
                <div class="share-content" id="shareContent"></div>
                <button class="copy-button" onclick="copyShareText()">📋 Copy Results to Share</button>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-primary" id="replayBtn" onclick="replayGame()" style="display: none;">Replay from Move #<span id="replayMoveNum">0</span></button>
                <button class="btn btn-secondary" onclick="closeResultsModal(); newGame();">New Game</button>
                <button class="btn btn-secondary" onclick="closeResultsModal()">Close</button>
            </div>
        </div>
    </div>
    
    <script>
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
    </script>
</body>
</html>
