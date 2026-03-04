import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from '../components/window/window.component';
import { SnakeComponent } from './snake.component';
import { TicTacToeComponent } from './tictactoe.component';
import { MemoryComponent } from './memory.component';
import { WordPuzzleComponent } from './wordpuzzle.component';
import { ArkanoidComponent } from './arkanoid.component';

interface Game {
  title: string;
  description: string;
  icon: string;
  playUrl?: string;
  technologies: string[];
  type: 'snake' | 'tictactoe' | 'memory' | 'wordpuzzle' | 'arkanoid';
}

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    CommonModule, 
    WindowComponent,
    SnakeComponent,
    TicTacToeComponent,
    MemoryComponent,
    WordPuzzleComponent,
    ArkanoidComponent
  ],
  template: `
    <app-window title="Games" icon="🎮" closeRoute="/">
      <div class="space-y-6">
        <div *ngFor="let game of games" class="bg-gray-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-16 h-16 bg-windows-blue/10 dark:bg-dark-windows-blue/20 rounded-lg flex items-center justify-center">
              <span class="text-4xl">{{ game.icon }}</span>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">{{ game.title }}</h3>
              <p class="text-gray-700 dark:text-gray-300 mb-4">{{ game.description }}</p>
              
              <div class="flex items-center gap-3 mb-4">
                <button *ngIf="game.playUrl" 
                        (click)="openGameModal(game)"
                        class="px-4 py-2 bg-windows-blue dark:bg-dark-windows-blue text-white rounded-lg hover:bg-windows-dark-blue dark:hover:bg-dark-windows-dark-blue transition-colors font-semibold cursor-pointer">
                  🎮 Play Now
                </button>
                <button *ngIf="!game.playUrl"
                        class="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold cursor-not-allowed">
                  Coming Soon
                </button>
              </div>

              <div class="flex flex-wrap gap-2">
                <span *ngFor="let tech of game.technologies" 
                      class="px-3 py-1 bg-windows-blue/10 dark:bg-dark-windows-blue/30 text-windows-blue dark:text-dark-windows-blue rounded-full text-sm font-medium">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="games.length === 0" class="text-center py-12">
          <span class="text-6xl mb-4 block">🎮</span>
          <p class="text-gray-600 dark:text-gray-400 text-lg">No games available yet. Check back soon!</p>
        </div>
      </div>

      <!-- Game Modal -->
      <div *ngIf="selectedGame" 
           class="fixed top-10 left-0 right-0 bottom-0 bg-black/50 dark:bg-black/70 z-[100] flex items-center justify-center"
           (click)="closeGameModal()">
        <div class="bg-white dark:bg-gray-900 w-full h-full max-w-4xl rounded-lg shadow-2xl overflow-hidden flex flex-col"
             (click)="$event.stopPropagation()">
          <!-- Modal Header -->
          <div class="bg-windows-blue dark:bg-dark-windows-blue text-white px-4 py-2 md:px-6 md:py-4 flex items-center justify-between border-b-2 border-black dark:border-gray-700">
            <div class="flex items-center gap-2">
              <span class="text-xl">{{ selectedGame.icon }}</span>
              <h2 class="font-bold text-lg">{{ selectedGame.title }}</h2>
            </div>
            <button (click)="closeGameModal()" 
                    class="w-10 h-8 bg-windows-gray dark:bg-dark-windows-gray border-2 border-t-white border-l-white border-r-black border-b-black dark:border-t-gray-400 dark:border-l-gray-400 dark:border-r-gray-600 dark:border-b-gray-600 hover:bg-red-500 dark:hover:bg-red-600 flex items-center justify-center text-lg font-bold transition-colors text-white">
              ×
            </button>
          </div>

          <!-- Game Content -->
          <div class="flex-1 overflow-y-auto p-4 md:p-6 dark:text-gray-100">
            <app-snake *ngIf="selectedGame.type === 'snake'"></app-snake>
            <app-tictactoe *ngIf="selectedGame.type === 'tictactoe'"></app-tictactoe>
            <app-memory *ngIf="selectedGame.type === 'memory'"></app-memory>
            <app-wordpuzzle *ngIf="selectedGame.type === 'wordpuzzle'"></app-wordpuzzle>
            <app-arkanoid *ngIf="selectedGame.type === 'arkanoid'"></app-arkanoid>
          </div>
        </div>
      </div>
    </app-window>
  `
})
export class GamesComponent {
  selectedGame: Game | null = null;

  games: Game[] = [
    {
      title: 'Snake Game',
      description: 'Classic snake game built with JavaScript. Control the snake to eat food and grow longer. Avoid hitting walls or yourself!',
      icon: '🐍',
      playUrl: '#',
      technologies: ['JavaScript', 'HTML5', 'CSS3'],
      type: 'snake'
    },
    {
      title: 'Tic Tac Toe',
      description: 'A simple yet engaging tic-tac-toe game with AI opponent. Challenge yourself to beat the computer!',
      icon: '⭕',
      technologies: ['JavaScript', 'React', 'CSS'],
      type: 'tictactoe'
    },
    {
      title: 'Memory Card Game',
      description: 'Test your memory with this card matching game. Flip cards to find matching pairs and complete the board!',
      icon: '🃏',
      playUrl: '#',
      technologies: ['TypeScript', 'Angular', 'CSS'],
      type: 'memory'
    },
    {
      title: 'Word Puzzle',
      description: 'A word guessing game where you have limited attempts to guess the hidden word.',
      icon: '🧩',
      playUrl: '#',
      technologies: ['JavaScript', 'Vue.js'],
      type: 'wordpuzzle'
    },
    {
      title: 'Arkanoid',
      description: 'Classic brick-breaking game! Use arrow keys or mouse to move the paddle and bounce the ball to break all bricks.',
      icon: '🧱',
      playUrl: '#',
      technologies: ['TypeScript', 'Canvas API', 'Angular'],
      type: 'arkanoid'
    }
  ];

  openGameModal(game: Game) {
    this.selectedGame = game;
  }

  closeGameModal() {
    this.selectedGame = null;
  }
}
