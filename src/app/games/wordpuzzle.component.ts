import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wordpuzzle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center">
      <div class="mb-4 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-2">Guess the word! You have {{ attempts }} attempts left.</p>
        <p class="text-lg font-bold mb-2" *ngIf="gameOver">
          {{ won ? 'Congratulations! You won! 🎉' : 'Game Over! The word was: ' + word }}
        </p>
        <button (click)="reset()"
                class="px-4 py-2 bg-windows-blue text-white rounded-lg hover:bg-windows-dark-blue transition-colors font-semibold text-sm">
          New Word
        </button>
      </div>
      <div class="mb-4">
        <div class="flex gap-2 justify-center mb-4 flex-wrap">
          <span *ngFor="let letter of display" 
                class="w-12 h-12 border-2 border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center text-2xl font-bold bg-white dark:bg-gray-800">
            {{ letter }}
          </span>
        </div>
        <div class="flex flex-wrap gap-2 justify-center max-w-md">
          <button *ngFor="let letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')"
                  (click)="guessLetter(letter)"
                  [disabled]="guessedLetters.includes(letter) || gameOver"
                  class="w-10 h-10 border-2 border-gray-300 dark:border-gray-700 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  [class.bg-red-300]="guessedLetters.includes(letter) && !word.includes(letter)"
                  [class.bg-green-300]="guessedLetters.includes(letter) && word.includes(letter)">
            {{ letter }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class WordPuzzleComponent {
  words = ['ANGULAR', 'TYPESCRIPT', 'JAVASCRIPT', 'REACT', 'VUE', 'NODEJS', 'PYTHON', 'JAVA', 'HTML', 'CSS'];
  word = '';
  display: string[] = [];
  guessedLetters: string[] = [];
  attempts = 6;
  gameOver = false;
  won = false;

  constructor() {
    this.reset();
  }

  reset() {
    this.word = this.words[Math.floor(Math.random() * this.words.length)];
    this.display = this.word.split('').map(() => '_');
    this.guessedLetters = [];
    this.attempts = 6;
    this.gameOver = false;
    this.won = false;
  }

  guessLetter(letter: string) {
    if (this.guessedLetters.includes(letter) || this.gameOver) return;
    
    this.guessedLetters.push(letter);
    
    if (this.word.includes(letter)) {
      this.word.split('').forEach((char, index) => {
        if (char === letter) {
          this.display[index] = letter;
        }
      });
      
      if (!this.display.includes('_')) {
        this.won = true;
        this.gameOver = true;
      }
    } else {
      this.attempts--;
      if (this.attempts === 0) {
        this.gameOver = true;
      }
    }
  }
}
