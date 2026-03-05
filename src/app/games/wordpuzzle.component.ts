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
  word = '';
  display: string[] = [];
  guessedLetters: string[] = [];
  attempts = 6;
  gameOver = false;
  won = false;

  private readonly wordList = [
    'APPLE', 'BREAD', 'CHAIR', 'DANCE', 'EARTH', 'FLAME', 'GRAPE', 'HEART', 'IMAGE', 'JOKER',
    'KNIFE', 'LIGHT', 'MAGIC', 'NIGHT', 'OCEAN', 'PEACE', 'QUICK', 'RIVER', 'SMILE', 'TABLE',
    'VOICE', 'WHEAT', 'YOUNG', 'ZEBRA', 'BEACH', 'CLOUD', 'DREAM', 'FLOWER', 'GREEN', 'HAPPY',
    'JELLY', 'LEMON', 'MUSIC', 'PAPER', 'QUEEN', 'ROBOT', 'STONE', 'TIGER', 'WATER', 'YELLOW',
    'BANANA', 'CAMERA', 'DANCER', 'EAGLE', 'FAMILY', 'GARDEN', 'ISLAND', 'JUNGLE', 'KITTEN', 'LEMON',
    'MONKEY', 'NATURE', 'ORANGE', 'PENCIL', 'RABBIT', 'SCHOOL', 'TIGER', 'VICTOR', 'WINDOW', 'YELLOW',
    'BIRTH', 'CLOCK', 'DRINK', 'FROST', 'GHOST', 'HORSE', 'JOKES', 'LUNCH', 'MOUSE', 'PHONE',
    'QUART', 'ROBIN', 'SPACE', 'THREE', 'UNITY', 'WOMAN', 'XENON', 'YACHT', 'ZONAL', 'BROWN',
    'CLEAN', 'DREAM', 'EARLY', 'FINAL', 'GIANT', 'HUMAN', 'INNER', 'JUDGE', 'KNOCK', 'LARGE',
    'MONEY', 'NORTH', 'OTHER', 'PHASE', 'QUIET', 'RADIO', 'SHINE', 'THINK', 'UNION', 'WOMEN',
    'XEROX', 'YOUTH', 'ZONED', 'BLACK', 'CROWN', 'DRIVE', 'FOCUS', 'GLOBE', 'HOTEL', 'INPUT',
    'JUMPS', 'KNEES', 'LEAVE', 'MARCH', 'NOVEL', 'OFFER', 'PHONE', 'QUEST', 'REACH', 'SHAPE',
    'TRAIN', 'USAGE', 'VALUE', 'WAVES', 'XENIA', 'YARDS', 'ZONES', 'BRAVE', 'CRAFT', 'DRAWN',
    'FACES', 'GAMES', 'HANDS', 'IDEAS', 'JOKES', 'KINGS', 'LANDS', 'MAKES', 'NEEDS', 'OPENS',
    'PAGES', 'QUICK', 'RINGS', 'SIDES', 'TALES', 'USERS', 'VIEWS', 'WORDS', 'XENON', 'YEARS',
    'ZEROS', 'BRIEF', 'CLEAR', 'DRAWS', 'FACTS', 'GATES', 'HILLS', 'ITEMS', 'JUMPS', 'KINDS',
    'LINES', 'MAILS', 'NAMES', 'OWNER', 'PARTS', 'QUITE', 'ROADS', 'SIGNS', 'TASKS', 'UNITS',
    'VOTES', 'WALLS', 'XENIA', 'YARDS', 'ZONES', 'BROKE', 'CROWD', 'DROPS', 'FACES', 'GRASS',
    'HOLES', 'ICONS', 'JUMPS', 'KEEPS', 'LISTS', 'MIXES', 'NODES', 'OPENS', 'PICKS', 'QUITS',
    'ROLES', 'SIZES', 'TEXTS', 'USERS', 'VESTS', 'WIRES', 'XENON', 'YIELDS', 'ZONES', 'BRAND',
    'CHART', 'DRAFT', 'FACTS', 'GRANT', 'HARSH', 'IDEAL', 'JUMPS', 'KNITS', 'LUNGS', 'MAGIC',
    'NODES', 'OPENS', 'PATCH', 'QUITS', 'RANKS', 'SHARP', 'TRACK', 'USAGE', 'VALUE', 'WAVES',
    'XENIA', 'YARDS', 'ZONES', 'BRAIN', 'CLEAN', 'DRAIN', 'FACES', 'GRAIN', 'HANDS', 'IDEAS',
    'JUMPS', 'KNEES', 'LUNGS', 'MAINS', 'NEARS', 'OPENS', 'PAGES', 'QUITS', 'RANKS', 'SHARP',
    'TRAIN', 'USAGE', 'VALUE', 'WAVES', 'XENIA', 'YARDS', 'ZONES', 'BRAND', 'CROWD', 'DROPS',
    'FACTS', 'GRASS', 'HOLES', 'ICONS', 'JUMPS', 'KEEPS', 'LISTS', 'MIXES', 'NODES', 'OPENS',
    'PICKS', 'QUITS', 'ROLES', 'SIZES', 'TEXTS', 'USERS', 'VESTS', 'WIRES', 'XENON', 'YIELDS'
  ];

  constructor() {
    this.reset();
  }

  reset() {
    this.word = this.wordList[Math.ceil(Math.random() * this.wordList.length)];
    this.display = this.word.split('').map(() => '_');
    this.guessedLetters = [];
    this.attempts = this.word.length;
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
