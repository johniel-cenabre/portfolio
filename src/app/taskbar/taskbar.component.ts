import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    <div class="h-10 bg-windows-gray border-t-2 border-black flex items-center px-2 shadow-lg z-[60] relative">
      <!-- Start Button -->
      <button (click)="toggleStartMenu()" 
              class="h-8 px-3 bg-windows-gray border-2 flex items-center gap-2 font-bold text-sm"
              [ngClass]="{
                'border-t-black border-l-black border-r-white border-b-white': startMenuOpen,
                'border-t-white border-l-white border-r-black border-b-black': !startMenuOpen
              }">
        <span class="text-lg">🪟</span>
        <span>Start</span>
      </button>

      <!-- Start Menu -->
      <div *ngIf="startMenuOpen" 
           class="absolute bottom-10 left-0 w-80 bg-windows-light-gray border-2 border-black shadow-2xl z-[70]"
           (click)="$event.stopPropagation()">
        <!-- Menu Header -->
        <div class="bg-windows-blue text-white px-4 py-2 border-b-2 border-black">
          <div class="flex items-center gap-2">
            <span class="text-xl">🪟</span>
            <span class="font-bold text-lg">Portfolio</span>
          </div>
        </div>

        <!-- Menu Items -->
        <div class="max-h-[500px] overflow-y-auto">
          <div *ngFor="let item of menuItems" 
               (click)="navigateToRoute(item.route)"
               class="flex items-center gap-3 px-4 py-3 hover:bg-windows-blue hover:text-white cursor-pointer transition-colors border-b border-gray-300 last:border-b-0">
            <div class="flex-shrink-0 w-10 h-10 border-gray-300 flex items-center justify-center text-2xl">
              {{ item.icon }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-sm">{{ item.name }}</div>
              <div class="text-xs text-gray-600 truncate">{{ item.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TaskbarComponent {
  startMenuOpen = false;

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

  constructor(private router: Router) {}

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
