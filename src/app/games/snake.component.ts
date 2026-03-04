import { Component, HostListener, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center">
      <div class="mb-4 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-2">Use arrow keys to control the snake. Eat food to grow!</p>
        <p class="text-sm text-gray-500 dark:text-gray-500">Score: <span class="font-bold">{{ score }}</span></p>
      </div>
      <canvas #canvas 
              [width]="canvasSize" 
              [height]="canvasSize"
              class="border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-full"></canvas>
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
