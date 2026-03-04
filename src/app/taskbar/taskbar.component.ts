import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService, Theme } from '../services/theme.service';
import { Subscription } from 'rxjs';

interface MenuItem {
  name: string;
  icon: string;
  route: string;
  description: string;
}

@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-10 bg-windows-gray dark:bg-dark-windows-gray border-t-2 border-black dark:border-gray-700 flex items-center px-2 shadow-lg z-[60] relative">
      <!-- Start Button -->
      <button (click)="toggleStartMenu()" 
              class="h-8 px-3 bg-windows-gray dark:bg-dark-windows-gray border-2 flex items-center gap-2 font-bold text-sm dark:text-gray-200"
              [ngClass]="{
                'border-t-black border-l-black border-r-white border-b-white dark:border-t-gray-600 dark:border-l-gray-600 dark:border-r-gray-400 dark:border-b-gray-400': startMenuOpen,
                'border-t-white border-l-white border-r-black border-b-black dark:border-t-gray-400 dark:border-l-gray-400 dark:border-r-gray-600 dark:border-b-gray-600': !startMenuOpen
              }">
        <span class="text-lg">🪟</span>
        <span>Start</span>
      </button>

      <!-- Theme Toggle Button -->
      <button (click)="toggleTheme()" 
              class="h-8 px-3 ml-2 bg-windows-gray dark:bg-dark-windows-gray border-2 border-t-white border-l-white border-r-black border-b-black dark:border-t-gray-400 dark:border-l-gray-400 dark:border-r-gray-600 dark:border-b-gray-600 flex items-center gap-2 font-bold text-sm dark:text-gray-200 hover:bg-windows-light-gray dark:hover:bg-gray-700 transition-colors">
        <span class="text-lg">{{ currentTheme === 'light' ? '🌙' : '☀️' }}</span>
        <span class="hidden sm:inline">{{ currentTheme === 'light' ? 'Dark' : 'Light' }}</span>
      </button>

      <!-- Start Menu -->
      <div *ngIf="startMenuOpen" 
           class="absolute top-10 left-0 w-80 bg-windows-light-gray dark:bg-dark-windows-light-gray border-2 border-black dark:border-gray-700 shadow-2xl z-[70] max-h-[calc(100vh-5rem)] overflow-y-auto"
           (click)="$event.stopPropagation()">
        <!-- Menu Header -->
        <div class="bg-windows-blue dark:bg-dark-windows-blue text-white px-4 py-2 border-b-2 border-black dark:border-gray-700">
          <div class="flex items-center gap-2">
            <span class="text-xl">🪟</span>
            <span class="font-bold text-lg">Portfolio</span>
          </div>
        </div>

        <!-- Menu Items -->
        <div class="max-h-[550px] overflow-y-auto">
          <div *ngFor="let item of menuItems" 
               (click)="navigateToRoute(item.route)"
               class="flex items-center gap-3 px-4 py-3 hover:bg-windows-blue dark:hover:bg-dark-windows-blue hover:text-white cursor-pointer transition-colors border-b border-gray-300 dark:border-gray-700 last:border-b-0 dark:text-gray-200">
            <div class="flex-shrink-0 w-10 h-10 border-gray-300 dark:border-gray-600 flex items-center justify-center text-2xl">
              {{ item.icon }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-sm">{{ item.name }}</div>
              <div class="text-xs text-gray-600 dark:text-gray-400 truncate">{{ item.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TaskbarComponent implements OnInit, OnDestroy {
  startMenuOpen = false;
  currentTheme: Theme = 'light';
  private themeSubscription?: Subscription;

  menuItems: MenuItem[] = [
    { name: 'Bio', icon: '📧', route: 'bio', description: 'Personal information and background' },
    { name: 'Skills', icon: '⚡', route: 'skills', description: 'Technical skills and technologies' },
    { name: 'Experience', icon: '💻', route: 'experience', description: 'Work experience and positions' },
    { name: 'Projects', icon: '💼', route: 'projects', description: 'Company and personal projects' },
    { name: 'Education', icon: '🎓', route: 'education', description: 'Educational background and achievements' },
    { name: 'Contact', icon: '👤', route: 'contact', description: 'Get in touch with me' },
    { name: 'Games', icon: '🎮', route: 'games', description: 'Casual games I created' },
    { name: 'Blog', icon: '📝', route: 'blog', description: 'Personal blog about my career' }
  ];

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleStartMenu() {
    this.startMenuOpen = !this.startMenuOpen;
  }

  navigateToRoute(route: string) {
    this.router.navigate([`/${route}`]);
    this.startMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.startMenuOpen) {
      const target = event.target as HTMLElement;
      const taskbarElement = target.closest('app-taskbar');
      if (!taskbarElement) {
        this.startMenuOpen = false;
      }
    }
  }
}
