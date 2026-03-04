import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tictactoe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center">
      <div class="mb-4 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-2" *ngIf="!gameOver">
          {{ currentPlayer === 'X' ? 'Your turn (X)' : 'Computer\'s turn (O)' }}
        </p>
        <p class="text-lg font-bold mb-2" *ngIf="gameOver">
          {{ winner ? (winner === 'X' ? 'You Win! 🎉' : 'Computer Wins! 🤖') : 'It\'s a Draw! 🤝' }}
        </p>
        <button (click)="reset()"
                class="px-4 py-2 bg-windows-blue text-white rounded-lg hover:bg-windows-dark-blue transition-colors font-semibold text-sm">
          New Game
        </button>
      </div>
      <div class="grid grid-cols-3 gap-2">
        <button *ngFor="let cell of board; let i = index"
                (click)="makeMove(i)"
                [disabled]="cell !== '' || gameOver"
                class="w-20 h-20 md:w-24 md:h-24 bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg text-3xl md:text-4xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50">
          {{ cell }}
        </button>
      </div>
    </div>
  `
})
export class TicTacToeComponent {
  board: string[] = Array(9).fill('');
  currentPlayer: 'X' | 'O' = 'X';
  gameOver = false;
  winner: string | null = null;

  constructor() {
    this.reset();
  }

  reset() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.winner = null;
  }

  makeMove(index: number) {
    if (this.board[index] !== '' || this.gameOver) return;
    
    this.board[index] = this.currentPlayer;
    this.checkWinner();
    
    if (!this.gameOver && this.currentPlayer === 'X') {
      this.currentPlayer = 'O';
      setTimeout(() => this.computerMove(), 500);
    }
  }

  computerMove() {
    const availableMoves = this.board.map((cell, index) => cell === '' ? index : -1).filter(i => i !== -1);
    if (availableMoves.length === 0) return;
    
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    this.board[randomMove] = 'O';
    this.checkWinner();
    this.currentPlayer = 'X';
  }

  checkWinner() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (let line of lines) {
      const [a, b, c] = line;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a];
        this.gameOver = true;
        return;
      }
    }
    
    if (this.board.every(cell => cell !== '')) {
      this.gameOver = true;
    }
  }
}
