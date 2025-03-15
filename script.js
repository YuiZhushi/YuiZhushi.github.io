document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const startBtn = document.getElementById('start-btn');
    const scoreElement = document.getElementById('score');
    const timeElement = document.getElementById('time');
    
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let bubbleInterval;
    let isGameRunning = false;
    
    // 泡泡顏色
    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8',
        '#33FFF5', '#FFD433', '#8C33FF', '#FF8C33', '#33FFBD'
    ];
    
    // 開始遊戲
    startBtn.addEventListener('click', () => {
        if (isGameRunning) return;
        
        startGame();
    });
    
    function startGame() {
        // 重置遊戲狀態
        score = 0;
        timeLeft = 30;
        scoreElement.textContent = score;
        timeElement.textContent = timeLeft;
        
        // 清空遊戲區域
        gameArea.innerHTML = '';
        
        isGameRunning = true;
        startBtn.disabled = true;
        
        // 開始產生泡泡
        bubbleInterval = setInterval(createBubble, 800);
        
        // 開始倒計時
        gameInterval = setInterval(() => {
            timeLeft--;
            timeElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }
    
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // 隨機大小 (30-80px)
        const size = Math.floor(Math.random() * 50) + 30;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // 隨機位置
        const maxX = gameArea.clientWidth - size;
        const maxY = gameArea.clientHeight - size;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        bubble.style.left = `${randomX}px`;
        bubble.style.top = `${randomY}px`;
        
        // 隨機顏色
        const colorIndex = Math.floor(Math.random() * colors.length);
        bubble.style.backgroundColor = colors[colorIndex];
        
        // 隨機點數 (1-5)
        const points = Math.floor(Math.random() * 5) + 1;
        bubble.textContent = points;
        
        // 點擊事件
        bubble.addEventListener('click', () => {
            if (!isGameRunning) return;
            
            score += points;
            scoreElement.textContent = score;
            
            bubble.classList.add('popping');
            
            // 泡泡消失後移除
            setTimeout(() => {
                if (bubble.parentNode === gameArea) {
                    gameArea.removeChild(bubble);
                }
            }, 300);
        });
        
        // 自動消失 (5-8秒)
        const lifespan = (Math.random() * 3000) + 5000;
        setTimeout(() => {
            if (bubble.parentNode === gameArea) {
                gameArea.removeChild(bubble);
            }
        }, lifespan);
        
        gameArea.appendChild(bubble);
    }
    
    function endGame() {
        isGameRunning = false;
        clearInterval(gameInterval);
        clearInterval(bubbleInterval);
        startBtn.disabled = false;
        
        // 顯示遊戲結束和分數
        alert(`遊戲結束！你的分數是: ${score}`);
    }
});
