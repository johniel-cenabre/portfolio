import { Component, HostListener, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Position {
  x: number;
  y: number;
}

interface Tetromino {
  shape: number[][];
  color: string;
}

@Component({
  selector: 'app-tetris',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center">
      <div class="mb-4 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-2">Use arrow keys to move/rotate. Space to drop fast! On mobile: tap to rotate, swipe down to drop, swipe left/right to move.</p>
        <div class="flex gap-4 justify-center text-sm">
          <p class="text-gray-500 dark:text-gray-500">Score: <span class="font-bold">{{ score }}</span></p>
          <p class="text-gray-500 dark:text-gray-500">Lines: <span class="font-bold">{{ lines }}</span></p>
          <p class="text-gray-500 dark:text-gray-500">Level: <span class="font-bold">{{ level }}</span></p>
        </div>
      </div>
      <canvas #canvas 
              (touchstart)="onTouchStart($event)"
              (touchmove)="onTouchMove($event)"
              (touchend)="onTouchEnd($event)"
              class="border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-full touch-none"></canvas>
      <div class="mt-2 flex items-center gap-4 flex-wrap">
        <div class="flex flex-col items-center">
          <canvas #nextPieceCanvas 
                  class="border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  [style.width.px]="nextPiecePreviewSize"
                  [style.height.px]="nextPiecePreviewSize"></canvas>
        </div>
        <div class="flex gap-2">
          <button *ngIf="gameOver" 
                  (click)="startGame()"
                  class="px-6 py-2 bg-windows-blue dark:bg-dark-windows-blue text-white rounded-lg hover:bg-windows-dark-blue dark:hover:bg-dark-windows-dark-blue transition-colors font-semibold">
            Play Again
          </button>
          <button *ngIf="!gameOver && !isPlaying" 
                  (click)="startGame()"
                  class="px-6 py-2 bg-windows-blue dark:bg-dark-windows-blue text-white rounded-lg hover:bg-windows-dark-blue dark:hover:bg-dark-windows-dark-blue transition-colors font-semibold">
            Start Game
          </button>
          <button *ngIf="isPlaying && !gameOver" 
                  (click)="pauseGame()"
                  class="px-6 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors font-semibold">
            Pause
          </button>
        </div>
      </div>
    </div>
  `
})
export class TetrisComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('nextPieceCanvas', { static: false }) nextPieceCanvasRef!: ElementRef<HTMLCanvasElement>;
  
  score = 0;
  lines = 0;
  level = 1;
  gameOver = false;
  isPlaying = false;
  isPaused = false;
  
  canvasWidth = 300;
  canvasHeight = 600;
  nextPiecePreviewSize = 40;
  
  private interval: any;
  private dropInterval = 1000;
  private lastTime = 0;
  
  private readonly COLS = 10;
  private readonly ROWS = 20;
  private readonly BLOCK_SIZE = 30;
  
  private board: number[][] = [];
  private currentPiece: { shape: number[][], x: number, y: number, color: string } | null = null;
  private nextPiece: { shape: number[][], color: string } | null = null;
  
  private readonly TETROMINOES: { [key: string]: Tetromino } = {
    'I': {
      shape: [[1, 1, 1, 1]],
      color: '#00f0f0'
    },
    'O': {
      shape: [
        [1, 1],
        [1, 1]
      ],
      color: '#f0f000'
    },
    'T': {
      shape: [
        [0, 1, 0],
        [1, 1, 1]
      ],
      color: '#a000f0'
    },
    'S': {
      shape: [
        [0, 1, 1],
        [1, 1, 0]
      ],
      color: '#00f000'
    },
    'Z': {
      shape: [
        [1, 1, 0],
        [0, 1, 1]
      ],
      color: '#f00000'
    },
    'J': {
      shape: [
        [1, 0, 0],
        [1, 1, 1]
      ],
      color: '#0000f0'
    },
    'L': {
      shape: [
        [0, 0, 1],
        [1, 1, 1]
      ],
      color: '#f0a000'
    }
  };
  
  private resizeHandler = () => this.updateCanvasSize();
  private resizeObserver?: ResizeObserver;
  
  // Touch controls
  private touchStartPos: { x: number, y: number } | null = null;
  private touchStartTime = 0;
  private readonly minSwipeDistance = 30; // Minimum distance to register a swipe
  private readonly maxTapDistance = 10; // Maximum distance for a tap
  private readonly maxTapDuration = 300; // Maximum duration for a tap (ms)

  ngOnInit() {
    this.initBoard();
  }

  ngAfterViewInit() {
    this.updateCanvasSize();
    window.addEventListener('resize', this.resizeHandler);
    
    // Use ResizeObserver to watch for modal size changes
    const container = this.canvasRef?.nativeElement?.closest('.flex-1');
    if (container && 'ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateCanvasSize();
      });
      this.resizeObserver.observe(container as Element);
    }
    
    this.draw();
    this.drawNextPiece();
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    window.removeEventListener('resize', this.resizeHandler);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private updateCanvasSize() {
    if (!this.canvasRef?.nativeElement) return;
    
    // Get the modal content container
    const container = this.canvasRef.nativeElement.closest('.flex-1');
    if (!container) {
      // Fallback to window-based calculation
      const maxWidth = Math.min(300, window.innerWidth - 100);
      this.canvasWidth = Math.max(250, maxWidth);
      this.canvasHeight = this.canvasWidth * 1.5;
      this.draw();
      return;
    }
    
    // Get available dimensions in the modal
    const containerRect = container.getBoundingClientRect();
    const availableHeight = containerRect.height;
    const availableWidth = containerRect.width;
    
    // Account for padding (p-4 md:p-6 = 16px on mobile, 24px on desktop)
    const padding = window.innerWidth >= 768 ? 48 : 32; // md:p-6 = 24px * 2, p-4 = 16px * 2
    
    // Account for game controls (header text, score display, buttons)
    // Header: ~60px, Score display: ~30px, Buttons: ~50px, margins: ~40px
    const controlsHeight = 180;
    
    // Calculate available height for canvas
    const maxCanvasHeight = availableHeight - padding - controlsHeight;
    const maxCanvasWidth = availableWidth - padding;
    
    // Calculate block size based on available height (prioritize fitting height)
    const blockSizeFromHeight = maxCanvasHeight / this.ROWS;
    const blockSizeFromWidth = maxCanvasWidth / this.COLS;
    
    // Use the smaller block size to ensure it fits in both dimensions
    const blockSize = Math.min(blockSizeFromHeight, blockSizeFromWidth);
    
    // Calculate canvas dimensions based on block size
    this.canvasWidth = blockSize * this.COLS;
    this.canvasHeight = blockSize * this.ROWS;
    
    // Ensure minimum size
    if (this.canvasWidth < 200) {
      this.canvasWidth = 200;
      this.canvasHeight = (this.canvasWidth / this.COLS) * this.ROWS;
    }
    if (this.canvasHeight < 400) {
      this.canvasHeight = 400;
      this.canvasWidth = (this.canvasHeight / this.ROWS) * this.COLS;
    }
    
    this.draw();
  }

  private initBoard() {
    this.board = Array(this.ROWS).fill(null).map(() => Array(this.COLS).fill(0));
  }

  private getRandomPiece(): { shape: number[][], color: string } {
    const pieces = Object.keys(this.TETROMINOES);
    const randomKey = pieces[Math.floor(Math.random() * pieces.length)];
    const tetromino = this.TETROMINOES[randomKey];
    return {
      shape: tetromino.shape.map(row => [...row]),
      color: tetromino.color
    };
  }

  private spawnPiece() {
    const piece = this.nextPiece || this.getRandomPiece();
    this.nextPiece = this.getRandomPiece();
    
    this.currentPiece = {
      shape: piece.shape.map(row => [...row]),
      x: Math.floor(this.COLS / 2) - Math.floor(piece.shape[0].length / 2),
      y: 0,
      color: piece.color
    };
    
    if (this.isCollision(this.currentPiece)) {
      this.gameOver = true;
      this.isPlaying = false;
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
    
    // Update next piece preview
    this.drawNextPiece();
  }

  private isCollision(piece: { shape: number[][], x: number, y: number }): boolean {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.x + x;
          const newY = piece.y + y;
          
          if (newX < 0 || newX >= this.COLS || newY >= this.ROWS) {
            return true;
          }
          
          if (newY >= 0 && this.board[newY][newX]) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private lockPiece() {
    if (!this.currentPiece) return;
    
    for (let y = 0; y < this.currentPiece.shape.length; y++) {
      for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
        if (this.currentPiece.shape[y][x]) {
          const boardY = this.currentPiece.y + y;
          const boardX = this.currentPiece.x + x;
          
          if (boardY >= 0) {
            this.board[boardY][boardX] = 1;
          }
        }
      }
    }
    
    this.clearLines();
    this.spawnPiece();
  }

  private clearLines() {
    let linesCleared = 0;
    
    for (let y = this.ROWS - 1; y >= 0; y--) {
      if (this.board[y].every(cell => cell === 1)) {
        this.board.splice(y, 1);
        this.board.unshift(Array(this.COLS).fill(0));
        linesCleared++;
        y++;
      }
    }
    
    if (linesCleared > 0) {
      this.lines += linesCleared;
      this.score += linesCleared * 100 * this.level;
      this.level = Math.floor(this.lines / 10) + 1;
      this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);
    }
  }

  private movePiece(dx: number, dy: number) {
    if (!this.currentPiece || this.gameOver || this.isPaused) return;
    
    const newPiece = {
      ...this.currentPiece,
      x: this.currentPiece.x + dx,
      y: this.currentPiece.y + dy
    };
    
    if (!this.isCollision(newPiece)) {
      this.currentPiece = newPiece;
      this.draw();
      return true;
    }
    return false;
  }

  private rotatePiece() {
    if (!this.currentPiece || this.gameOver || this.isPaused) return;
    
    const rotated = this.currentPiece.shape[0].map((_, i) =>
      this.currentPiece!.shape.map(row => row[i]).reverse()
    );
    
    const newPiece = {
      ...this.currentPiece,
      shape: rotated
    };
    
    if (!this.isCollision(newPiece)) {
      this.currentPiece = newPiece;
      this.draw();
    }
  }

  private dropPiece() {
    if (!this.currentPiece || this.gameOver || this.isPaused) return;
    
    while (this.movePiece(0, 1)) {
      // Keep dropping
    }
    this.lockPiece();
    this.draw();
  }

  private gameLoop(time: number) {
    if (!this.isPlaying || this.gameOver || this.isPaused) return;
    
    const deltaTime = time - this.lastTime;
    
    if (deltaTime > this.dropInterval) {
      if (!this.movePiece(0, 1)) {
        this.lockPiece();
      }
      this.draw();
      this.lastTime = time;
    }
    
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  startGame() {
    this.initBoard();
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.gameOver = false;
    this.isPlaying = true;
    this.isPaused = false;
    this.dropInterval = 1000;
    this.lastTime = performance.now();
    
    this.nextPiece = null;
    this.spawnPiece();
    this.draw();
    
    if (this.interval) {
      clearInterval(this.interval);
    }
    
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  pauseGame() {
    this.isPaused = !this.isPaused;
  }

  draw() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    
    // Calculate block size to fit both width and height
    const blockSizeX = this.canvasWidth / this.COLS;
    const blockSizeY = this.canvasHeight / this.ROWS;
    const blockSize = Math.min(blockSizeX, blockSizeY);
    
    // Clear canvas
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw board
    for (let y = 0; y < this.ROWS; y++) {
      for (let x = 0; x < this.COLS; x++) {
        if (this.board[y][x]) {
          ctx.fillStyle = '#6b7280';
          ctx.fillRect(x * blockSize, y * blockSize, blockSize - 1, blockSize - 1);
        }
      }
    }
    
    // Draw current piece
    if (this.currentPiece) {
      ctx.fillStyle = this.currentPiece.color;
      for (let y = 0; y < this.currentPiece.shape.length; y++) {
        for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
          if (this.currentPiece.shape[y][x]) {
            const drawX = (this.currentPiece.x + x) * blockSize;
            const drawY = (this.currentPiece.y + y) * blockSize;
            ctx.fillRect(drawX, drawY, blockSize - 1, blockSize - 1);
          }
        }
      }
    }
    
    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= this.COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * blockSize, 0);
      ctx.lineTo(x * blockSize, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= this.ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * blockSize);
      ctx.lineTo(canvas.width, y * blockSize);
      ctx.stroke();
    }
    
    // Draw game over overlay
    if (this.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
    }
    
    // Draw pause overlay
    if (this.isPaused && !this.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Paused', canvas.width / 2, canvas.height / 2);
    }
    
    // Draw next piece preview
    this.drawNextPiece();
  }

  private drawNextPiece() {
    const canvas = this.nextPieceCanvasRef?.nativeElement;
    if (!canvas || !this.nextPiece) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = this.nextPiecePreviewSize;
    canvas.height = this.nextPiecePreviewSize;
    
    // Clear canvas
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Calculate block size - find the maximum size needed for the piece
    const pieceWidth = this.nextPiece.shape[0].length;
    const pieceHeight = this.nextPiece.shape.length;
    const maxDimension = Math.max(pieceWidth, pieceHeight);
    const blockSize = (this.nextPiecePreviewSize - 10) / maxDimension; // Leave some padding
    
    // Calculate offset to center the piece
    const offsetX = (this.nextPiecePreviewSize - (pieceWidth * blockSize)) / 2;
    const offsetY = (this.nextPiecePreviewSize - (pieceHeight * blockSize)) / 2;
    
    // Draw the next piece
    ctx.fillStyle = this.nextPiece.color;
    for (let y = 0; y < this.nextPiece.shape.length; y++) {
      for (let x = 0; x < this.nextPiece.shape[y].length; x++) {
        if (this.nextPiece.shape[y][x]) {
          const drawX = offsetX + x * blockSize;
          const drawY = offsetY + y * blockSize;
          ctx.fillRect(drawX, drawY, blockSize - 1, blockSize - 1);
        }
      }
    }
  }

  onTouchStart(event: TouchEvent) {
    if (this.gameOver || !this.isPlaying || this.isPaused) return;
    event.preventDefault();
    
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    this.touchStartPos = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
    this.touchStartTime = Date.now();
  }

  onTouchMove(event: TouchEvent) {
    if (this.gameOver || !this.isPlaying || this.isPaused || !this.touchStartPos) return;
    event.preventDefault();
    
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    const currentPos = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
    
    const dx = currentPos.x - this.touchStartPos.x;
    const dy = currentPos.y - this.touchStartPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Only handle movement if it's a significant swipe
    if (distance >= this.minSwipeDistance) {
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      
      // Determine primary direction
      if (absDy > absDx) {
        // Vertical swipe
        if (dy > 0) {
          // Swipe down - move piece down continuously
          this.movePiece(0, 1);
          // Update touch start position for continuous movement
          this.touchStartPos = currentPos;
        }
      } else {
        // Horizontal swipe
        if (dx > 0) {
          // Swipe right
          this.movePiece(1, 0);
        } else {
          // Swipe left
          this.movePiece(-1, 0);
        }
        // Update touch start position for continuous movement
        this.touchStartPos = currentPos;
      }
    }
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.touchStartPos) return;
    event.preventDefault();
    
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    
    const touch = event.changedTouches[0];
    const rect = canvas.getBoundingClientRect();
    const endPos = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
    
    const dx = endPos.x - this.touchStartPos.x;
    const dy = endPos.y - this.touchStartPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const duration = Date.now() - this.touchStartTime;
    
    // Determine if it was a tap or swipe
    if (distance <= this.maxTapDistance && duration <= this.maxTapDuration) {
      // It's a tap - rotate the piece
      if (!this.gameOver && this.isPlaying && !this.isPaused) {
        this.rotatePiece();
      }
    } else if (distance >= this.minSwipeDistance) {
      // It's a swipe
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      
      if (absDy > absDx && dy > 0) {
        // Swipe down - hard drop
        if (!this.gameOver && this.isPlaying && !this.isPaused) {
          this.dropPiece();
        }
      }
    }
    
    // Reset touch tracking
    this.touchStartPos = null;
    this.touchStartTime = 0;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.gameOver || !this.isPlaying) return;
    
    switch(event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.movePiece(-1, 0);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.movePiece(1, 0);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.movePiece(0, 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.rotatePiece();
        break;
      case ' ':
        event.preventDefault();
        this.dropPiece();
        break;
    }
  }
}
