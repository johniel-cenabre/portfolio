import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from '../components/window/window.component';

interface Game {
  title: string;
  description: string;
  icon: string;
  playUrl?: string;
  technologies: string[];
}

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, WindowComponent],
  template: `
    <app-window title="Games" icon="🎮" closeRoute="/">
      <div class="space-y-6">
        <div *ngFor="let game of games" class="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-16 h-16 bg-windows-blue/10 rounded-lg flex items-center justify-center">
              <span class="text-4xl">{{ game.icon }}</span>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-xl text-gray-900 mb-2">{{ game.title }}</h3>
              <p class="text-gray-700 mb-4">{{ game.description }}</p>
              
              <div class="flex items-center gap-3 mb-4">
                <a *ngIf="game.playUrl" 
                   [href]="game.playUrl" 
                   target="_blank"
                   rel="noopener noreferrer"
                   class="px-4 py-2 bg-windows-blue text-white rounded-lg hover:bg-windows-dark-blue transition-colors font-semibold">
                  🎮 Play Now
                </a>
                <button *ngIf="!game.playUrl"
                        class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold cursor-not-allowed">
                  Coming Soon
                </button>
              </div>

              <div class="flex flex-wrap gap-2">
                <span *ngFor="let tech of game.technologies" 
                      class="px-3 py-1 bg-windows-blue/10 text-windows-blue rounded-full text-sm font-medium">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="games.length === 0" class="text-center py-12">
          <span class="text-6xl mb-4 block">🎮</span>
          <p class="text-gray-600 text-lg">No games available yet. Check back soon!</p>
        </div>
      </div>
    </app-window>
  `
})
export class GamesComponent {
  games: Game[] = [
    {
      title: 'Snake Game',
      description: 'Classic snake game built with JavaScript. Control the snake to eat food and grow longer. Avoid hitting walls or yourself!',
      icon: '🐍',
      playUrl: '#',
      technologies: ['JavaScript', 'HTML5', 'CSS3']
    },
    {
      title: 'Tic Tac Toe',
      description: 'A simple yet engaging tic-tac-toe game with AI opponent. Challenge yourself to beat the computer!',
      icon: '⭕',
      playUrl: '#',
      technologies: ['JavaScript', 'React', 'CSS']
    },
    {
      title: 'Memory Card Game',
      description: 'Test your memory with this card matching game. Flip cards to find matching pairs and complete the board!',
      icon: '🃏',
      technologies: ['TypeScript', 'Angular', 'CSS']
    },
    {
      title: 'Word Puzzle',
      description: 'A word guessing game where you have limited attempts to guess the hidden word. Coming soon!',
      icon: '🧩',
      technologies: ['JavaScript', 'Vue.js']
    }
  ];
}
