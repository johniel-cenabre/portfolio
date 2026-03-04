import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskbarComponent } from './taskbar/taskbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskbarComponent],
  template: `
    <div class="w-screen h-screen flex flex-col relative overflow-hidden bg-desktop-bg desktop-background">
      <!-- Taskbar -->
      <app-taskbar></app-taskbar>
      <!-- Desktop Area with Icons -->
      <div class="flex-1 relative overflow-hidden">
        <div class="absolute inset-0 p-4">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `
})
export class AppComponent {}
