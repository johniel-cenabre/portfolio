import { Component, HostListener, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center">
      <div class="mb-4 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-2">Use arrow keys (or touch/swipe on mobile) to control the snake. Eat food to grow!</p>
        <p class="text-sm text-gray-500 dark:text-gray-500">Score: <span class="font-bold">{{ score }}</span></p>
      </div>
      <canvas #canvas 
              [width]="canvasSize" 
              [height]="canvasSize"
              (touchstart)="onTouchStart($event)"
              (touchmove)="onTouchMove($event)"
              (touchend)="onTouchEnd($event)"
              class="border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-full touch-none"></canvas>
      <button *ngIf="gameOver" 
              (click)="startGame()"
              class="mt-4 px-6 py-2 bg-windows-blue text-white rounded-lg hover:bg-windows-dark-blue transition-colors font-semibold">
        Play Again
      </button>
    </div>
  `
})
export class SnakeComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  score = 0;
  gameOver = false;
  canvasSize = 400;
  
  private interval: any;
  private direction = { x: 1, y: 0 };
  private snake: Array<{x: number, y: number}> = [{x: 10, y: 10}];
  private food = {x: 15, y: 15};
  private readonly gridSize = 20;
  private readonly tileCount = 20;

  private touchStartPos: { x: number, y: number } | null = null;
  private readonly minSwipeDistance = 10; // Minimum distance to register a swipe

  private resizeHandler = () => this.updateCanvasSize();

  ngOnInit() {
    this.updateCanvasSize();
    window.addEventListener('resize', this.resizeHandler);
    this.startGame();
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    window.removeEventListener('resize', this.resizeHandler);
  }

  private updateCanvasSize() {
    const maxSize = Math.min(400, window.innerWidth - 100);
    this.canvasSize = Math.max(300, maxSize);
  }

  startGame() {
    this.snake = [{x: 10, y: 10}];
    this.direction = { x: 1, y: 0 };
    this.score = 0;
    this.gameOver = false;
    this.food = { x: 15, y: 15 };
    
    if (this.interval) {
      clearInterval(this.interval);
    }
    
    this.interval = setInterval(() => this.update(), 150);
    this.draw();
  }

  update() {
    const head = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };
    
    if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
      this.gameOver = true;
      clearInterval(this.interval);
      return;
    }
    
    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameOver = true;
      clearInterval(this.interval);
      return;
    }
    
    this.snake.unshift(head);
    
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score++;
      this.food = {
        x: Math.floor(Math.random() * this.tileCount),
        y: Math.floor(Math.random() * this.tileCount)
      };
    } else {
      this.snake.pop();
    }
    
    this.draw();
  }

  draw() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const cellSize = this.canvasSize / this.tileCount;
    
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0078d4';
    this.snake.forEach(segment => {
      ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize - 2, cellSize - 2);
    });
    
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(this.food.x * cellSize, this.food.y * cellSize, cellSize - 2, cellSize - 2);
  }

  onTouchStart(event: TouchEvent) {
    if (this.gameOver) return;
    event.preventDefault();
    
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    this.touchStartPos = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  onTouchMove(event: TouchEvent) {
    if (this.gameOver || !this.touchStartPos) return;
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
    
    // Only update direction if moved enough
    if (distance >= this.minSwipeDistance) {
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      
      // Determine primary direction (horizontal or vertical)
      if (absDx > absDy) {
        // Horizontal movement
        if (dx > 0 && this.direction.x === 0) {
          // Swipe right
          this.direction = { x: 1, y: 0 };
        } else if (dx < 0 && this.direction.x === 0) {
          // Swipe left
          this.direction = { x: -1, y: 0 };
        }
      } else {
        // Vertical movement
        if (dy > 0 && this.direction.y === 0) {
          // Swipe down
          this.direction = { x: 0, y: 1 };
        } else if (dy < 0 && this.direction.y === 0) {
          // Swipe up
          this.direction = { x: 0, y: -1 };
        }
      }
      
      // Update touch start position for continuous following
      this.touchStartPos = currentPos;
    }
  }

  onTouchEnd(event: TouchEvent) {
    event.preventDefault();
    this.touchStartPos = null;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.gameOver) return;
    
    switch(event.key) {
      case 'ArrowUp':
        if (this.direction.y === 0) {
          this.direction = { x: 0, y: -1 };
        }
        break;
      case 'ArrowDown':
        if (this.direction.y === 0) {
          this.direction = { x: 0, y: 1 };
        }
        break;
      case 'ArrowLeft':
        if (this.direction.x === 0) {
          this.direction = { x: -1, y: 0 };
        }
        break;
      case 'ArrowRight':
        if (this.direction.x === 0) {
          this.direction = { x: 1, y: 0 };
        }
        break;
    }
  }
}
