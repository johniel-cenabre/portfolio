import { Component, HostListener, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arkanoid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center">
      <div class="mb-4 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-2">Use arrow keys or mouse to move the paddle (cursor locks to canvas on start). Press <kbd class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-sm font-mono">Esc</kbd> to unlock; click canvas to lock again. Touch/drag on mobile.</p>
        <p class="text-sm text-gray-500 dark:text-gray-500">
          Score: <span class="font-bold">{{ score }}</span> | 
          Lives: <span class="font-bold">{{ lives }}</span> | 
          Bricks: <span class="font-bold">{{ bricksLeft }}</span>
        </p>
        <button *ngIf="!started" 
                (click)="startGame()"
                class="mt-4 px-4 py-2 bg-windows-blue text-white rounded-lg hover:bg-windows-dark-blue transition-colors font-semibold text-sm">
          Start Game
        </button>
      </div>
      <div class="relative inline-block max-w-full">
        <canvas #canvas
                [width]="canvasWidth" 
                [height]="canvasHeight"
                (click)="onCanvasClick($event)"
                (mousemove)="onMouseMove($event)"
                (touchstart)="onTouchStart($event)"
                (touchmove)="onTouchMove($event)"
                (touchend)="onTouchEnd($event)"
                class="border-2 border-gray-300 dark:border-gray-700 bg-gray-900 rounded-lg cursor-none max-w-full touch-none"></canvas>
        <div *ngIf="gameOver"
             class="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-black/70 text-white p-4">
          <p class="text-xl md:text-2xl font-bold text-center">
            {{ won ? 'Congratulations! You cleared all bricks! 🎉' : 'Game Over! Try again!' }}
          </p>
          <button (click)="startGame()"
                  class="px-4 py-2 bg-windows-blue text-white rounded-lg hover:bg-windows-dark-blue transition-colors font-semibold text-sm">
            Play Again
          </button>
        </div>
      </div>
    </div>
  `
})
export class ArkanoidComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  score = 0;
  lives = 3;
  bricksLeft = 0;
  gameOver = false;
  won = false;
  started = false;
  
  /** Base ball speed at reference height (400px). Scales with canvas height. */
  private readonly ballSpeedAtRefHeight = 4;
  private readonly ballSpeedRefHeight = 400;

  private get ballSpeed(): number {
    return this.ballSpeedAtRefHeight * (this.canvasHeight / this.ballSpeedRefHeight);
  }

  /** Only use pointer lock on desktop (not on touch/mobile devices). */
  private get shouldUsePointerLock(): boolean {
    return !('ontouchstart' in window);
  }

  private interval: any;
  private paddle = { x: 0, y: 0, width: 100, height: 10 };
  private ball = { x: 0, y: 0, radius: 8, dx: 0, dy: 0 };
  private bricks: Array<{x: number, y: number, width: number, height: number, destroyed: boolean, color: string}> = [];
  private keys: { left: boolean, right: boolean } = { left: false, right: false };
  private touchStartX: number | null = null;
  private touchStartPaddleX: number | null = null;
  
  canvasWidth = 600;
  canvasHeight = 400;

  private resizeHandler = () => this.updateCanvasSize();
  private pointerLockChangeHandler = () => {};

  ngOnInit() {
    // Make canvas responsive to modal width
    this.updateCanvasSize();
    window.addEventListener('resize', this.resizeHandler);
    document.addEventListener('pointerlockchange', this.pointerLockChangeHandler);
    this.initGame();
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    window.removeEventListener('resize', this.resizeHandler);
    document.removeEventListener('pointerlockchange', this.pointerLockChangeHandler);
    document.exitPointerLock();
  }

  private updateCanvasSize() {
    // Max width should fit within modal (max-w-4xl = 896px, with padding ~800px)
    const maxWidth = Math.min(800, window.innerWidth - 100);
    this.canvasWidth = Math.max(400, maxWidth);
    // Maintain aspect ratio
    this.canvasHeight = Math.floor(this.canvasWidth * 0.67);
    this.initGame();
  }

  initGame() {
    this.started = false;
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.won = false;
    this.paddle = { x: this.canvasWidth / 2 - 50, y: this.canvasHeight - 20, width: 100, height: 10 };
    const speed = this.ballSpeed;
    this.ball = { x: this.canvasWidth / 2, y: this.canvasHeight - 50, radius: 8, dx: speed, dy: -speed };
    this.keys = { left: false, right: false };
    
    // Create bricks
    this.bricks = [];
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
    const rows = 5;
    const cols = Math.floor((this.canvasWidth - 50) / 60); // Adjust cols based on width
    const brickWidth = Math.floor((this.canvasWidth - 50 - (cols - 1) * 5) / cols);
    const brickHeight = 20;
    const padding = 5;
    const offsetTop = 30;
    const offsetLeft = 25;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this.bricks.push({
          x: col * (brickWidth + padding) + offsetLeft,
          y: row * (brickHeight + padding) + offsetTop,
          width: brickWidth,
          height: brickHeight,
          destroyed: false,
          color: colors[row % colors.length]
        });
      }
    }
    
    this.bricksLeft = this.bricks.length;
    this.draw();
  }

  startGame() {
    this.initGame();
    this.started = true;
    
    if (this.interval) {
      clearInterval(this.interval);
    }
    
    this.interval = setInterval(() => this.update(), 16);
    
    const canvas = this.canvasRef?.nativeElement;
    if (this.shouldUsePointerLock && canvas?.requestPointerLock) {
      canvas.requestPointerLock();
    }
  }

  update() {
    if (this.gameOver || !this.started) return;
    
    // Move paddle
    if (this.keys.left && this.paddle.x > 0) {
      this.paddle.x -= 5;
    }
    if (this.keys.right && this.paddle.x < this.canvasWidth - this.paddle.width) {
      this.paddle.x += 5;
    }
    
    // Move ball
    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;
    
    // Ball collision with walls
    if (this.ball.x + this.ball.radius > this.canvasWidth || this.ball.x - this.ball.radius < 0) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y - this.ball.radius < 0) {
      this.ball.dy = -this.ball.dy;
    }
    
    // Ball collision with paddle
    if (this.ball.y + this.ball.radius > this.paddle.y &&
        this.ball.y - this.ball.radius < this.paddle.y + this.paddle.height &&
        this.ball.x + this.ball.radius > this.paddle.x &&
        this.ball.x - this.ball.radius < this.paddle.x + this.paddle.width) {
      this.ball.dy = -Math.abs(this.ball.dy);
      const hitPos = (this.ball.x - this.paddle.x) / this.paddle.width;
      this.ball.dx = (hitPos - 0.5) * this.ballSpeed * 2;
    }
    
    // Ball collision with bricks
    for (let brick of this.bricks) {
      if (!brick.destroyed &&
          this.ball.x + this.ball.radius > brick.x &&
          this.ball.x - this.ball.radius < brick.x + brick.width &&
          this.ball.y + this.ball.radius > brick.y &&
          this.ball.y - this.ball.radius < brick.y + brick.height) {
        brick.destroyed = true;
        this.ball.dy = -this.ball.dy;
        this.score += 10;
        this.bricksLeft--;
        
        if (this.bricksLeft === 0) {
          this.won = true;
          this.gameOver = true;
          clearInterval(this.interval);
          document.exitPointerLock();
        }
        break;
      }
    }
    
    // Ball falls below paddle
    if (this.ball.y > this.canvasHeight) {
      this.lives--;
        if (this.lives <= 0) {
        this.gameOver = true;
        clearInterval(this.interval);
        document.exitPointerLock();
      } else {
        this.ball.x = this.canvasWidth / 2;
        this.ball.y = this.canvasHeight - 50;
        const speed = this.ballSpeed;
        this.ball.dx = speed;
        this.ball.dy = -speed;
      }
    }
    
    this.draw();
  }

  draw() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    this.bricks.forEach(brick => {
      if (!brick.destroyed) {
        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
      }
    });
    
    ctx.fillStyle = '#0078d4';
    ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
    
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  onCanvasClick(event: MouseEvent) {
    if (!this.shouldUsePointerLock) return;
    if (this.started && !this.gameOver && document.pointerLockElement !== this.canvasRef?.nativeElement) {
      const canvas = this.canvasRef?.nativeElement;
      if (canvas?.requestPointerLock) {
        canvas.requestPointerLock();
      }
    }
  }

  onMouseMove(event: MouseEvent) {
    if (!this.started || this.gameOver) return;
    
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    
    if (document.pointerLockElement === canvas) {
      this.paddle.x = Math.max(0, Math.min(this.paddle.x + event.movementX, this.canvasWidth - this.paddle.width));
    } else {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      this.updatePaddlePosition(mouseX);
    }
  }

  onTouchStart(event: TouchEvent) {
    if (!this.started || this.gameOver) return;
    event.preventDefault();
    
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    
    const touch = event.touches[0];
    if (!touch) return;
    
    const rect = canvas.getBoundingClientRect();
    this.touchStartX = touch.clientX - rect.left;
    this.touchStartPaddleX = this.paddle.x;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.started || this.gameOver || this.touchStartX === null || this.touchStartPaddleX === null) return;
    event.preventDefault();
    
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    
    const touch = event.touches[0];
    if (!touch) return;
    
    const rect = canvas.getBoundingClientRect();
    const currentTouchX = touch.clientX - rect.left;
    
    // Calculate the distance dragged from the initial touch position
    const dragDistance = currentTouchX - this.touchStartX;
    
    // Update paddle position based on the drag distance relative to starting position
    const newPaddleX = this.touchStartPaddleX + dragDistance;
    this.paddle.x = Math.max(0, Math.min(newPaddleX, this.canvasWidth - this.paddle.width));
  }

  onTouchEnd(event: TouchEvent) {
    event.preventDefault();
    // Reset touch tracking
    this.touchStartX = null;
    this.touchStartPaddleX = null;
  }

  private updatePaddlePosition(x: number) {
    this.paddle.x = Math.max(0, Math.min(x - this.paddle.width / 2, this.canvasWidth - this.paddle.width));
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      document.exitPointerLock();
      return;
    }
    if (!this.started || this.gameOver) return;
    
    switch(event.key) {
      case 'ArrowLeft':
        this.keys.left = true;
        event.preventDefault();
        break;
      case 'ArrowRight':
        this.keys.right = true;
        event.preventDefault();
        break;
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowLeft':
        this.keys.left = false;
        break;
      case 'ArrowRight':
        this.keys.right = false;
        break;
    }
  }
}
