import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center">
      <div class="mb-4 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-2">Match pairs of cards. Find all pairs to win!</p>
        <p class="text-sm text-gray-500 dark:text-gray-500">Moves: <span class="font-bold">{{ moves }}</span> | Pairs Found: <span class="font-bold">{{ pairsFound }}/8</span></p>
        <button *ngIf="gameWon" 
                (click)="reset()"
                class="mt-2 px-4 py-2 bg-windows-blue text-white rounded-lg hover:bg-windows-dark-blue transition-colors font-semibold text-sm">
          Play Again
        </button>
      </div>
      <div class="grid grid-cols-4 gap-2 max-w-md">
        <button *ngFor="let card of cards; let i = index"
                (click)="flipCard(i)"
                [disabled]="card.flipped || card.matched || flippedCards.length === 2"
                class="w-16 h-16 md:w-20 md:h-20 bg-windows-blue dark:bg-dark-windows-blue text-white rounded-lg text-2xl md:text-3xl font-bold hover:opacity-80 disabled:cursor-not-allowed transition-all"
                [class.bg-gray-300]="!card.flipped && !card.matched"
                [class.dark:bg-gray-700]="!card.flipped && !card.matched"
                [class.text-transparent]="!card.flipped && !card.matched">
          {{ card.flipped || card.matched ? card.value : '?' }}
        </button>
      </div>
    </div>
  `
})
export class MemoryComponent {
  cards: Array<{value: string, flipped: boolean, matched: boolean}> = [];
  flippedCards: number[] = [];
  moves = 0;
  pairsFound = 0;
  gameWon = false;

  constructor() {
    this.reset();
  }

  reset() {
    const values = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎺'];
    const cardValues = [...values, ...values].sort(() => Math.random() - 0.5);
    this.cards = cardValues.map(value => ({ value, flipped: false, matched: false }));
    this.flippedCards = [];
    this.moves = 0;
    this.pairsFound = 0;
    this.gameWon = false;
  }

  flipCard(index: number) {
    if (this.cards[index].flipped || this.cards[index].matched || this.flippedCards.length === 2) {
      return;
    }
    
    this.cards[index].flipped = true;
    this.flippedCards.push(index);
    
    if (this.flippedCards.length === 2) {
      this.moves++;
      const [first, second] = this.flippedCards;
      
      if (this.cards[first].value === this.cards[second].value) {
        this.cards[first].matched = true;
        this.cards[second].matched = true;
        this.pairsFound++;
        this.flippedCards = [];
        
        if (this.pairsFound === 8) {
          this.gameWon = true;
        }
      } else {
        setTimeout(() => {
          this.cards[first].flipped = false;
          this.cards[second].flipped = false;
          this.flippedCards = [];
        }, 1000);
      }
    }
  }
}
