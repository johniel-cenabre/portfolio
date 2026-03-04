import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from '../components/window/window.component';

interface Skill {
  name: string;
  icon: string;
  category: string;
  level?: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, WindowComponent],
  template: `
    <app-window title="Skills" icon="⚡" closeRoute="/">
      <div class="space-y-8">
        <!-- Programming Languages -->
        <div>
          <h3 class="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
            <span>💻</span>
            <span>Programming Languages</span>
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div *ngFor="let skill of programmingLanguages" 
                 class="bg-gray-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow text-center">
              <div class="text-4xl mb-2">{{ skill.icon }}</div>
              <div class="font-semibold text-gray-900 dark:text-gray-100">{{ skill.name }}</div>
            </div>
          </div>
        </div>

        <!-- Frameworks & Libraries -->
        <div>
          <h3 class="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
            <span>⚙️</span>
            <span>Frameworks & Libraries</span>
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div *ngFor="let skill of frameworks" 
                 class="bg-gray-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow text-center">
              <div class="text-4xl mb-2">{{ skill.icon }}</div>
              <div class="font-semibold text-gray-900 dark:text-gray-100">{{ skill.name }}</div>
            </div>
          </div>
        </div>

        <!-- Tools & Technologies -->
        <div>
          <h3 class="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
            <span>🛠️</span>
            <span>Tools & Technologies</span>
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div *ngFor="let skill of tools" 
                 class="bg-gray-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow text-center">
              <div class="text-4xl mb-2">{{ skill.icon }}</div>
              <div class="font-semibold text-gray-900 dark:text-gray-100">{{ skill.name }}</div>
            </div>
          </div>
        </div>

        <!-- Databases -->
        <div>
          <h3 class="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
            <span>🗄️</span>
            <span>Databases</span>
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div *ngFor="let skill of databases" 
                 class="bg-gray-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow text-center">
              <div class="text-4xl mb-2">{{ skill.icon }}</div>
              <div class="font-semibold text-gray-900 dark:text-gray-100">{{ skill.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </app-window>
  `
})
export class SkillsComponent {
  programmingLanguages: Skill[] = [
    { name: 'JavaScript', icon: '🟨', category: 'language' },
    { name: 'TypeScript', icon: '🔷', category: 'language' },
    { name: 'HTML', icon: '📄', category: 'language' },
    { name: 'CSS', icon: '🎨', category: 'language' },
    { name: 'PHP', icon: '🐘', category: 'language' }
  ];

  frameworks: Skill[] = [
    { name: 'Angular', icon: '🅰️', category: 'framework' },
    { name: 'React', icon: '⚛️', category: 'framework' },
    { name: 'Vue.js', icon: '💚', category: 'framework' },
    { name: 'Node.js', icon: '🟢', category: 'framework' },
    { name: 'Express', icon: '🚂', category: 'framework' },
    { name: 'Tailwind CSS', icon: '💨', category: 'framework' },
    { name: 'Laravel', icon: '🔴', category: 'framework' },
    { name: 'Nest.js', icon: '🪺', category: 'framework' }
  ];

  tools: Skill[] = [
    { name: 'Git', icon: '📦', category: 'tool' },
    { name: 'Docker', icon: '🐳', category: 'tool' },
    { name: 'AWS', icon: '☁️', category: 'tool' },
    { name: 'VS Code', icon: '💻', category: 'tool' },
    { name: 'Postman', icon: '📮', category: 'tool' },
    { name: 'Jenkins', icon: '🤖', category: 'tool' },
    { name: 'Linux', icon: '🐧', category: 'tool' },
    { name: 'NPM', icon: '📦', category: 'tool' },
    { name: 'Webpack', icon: '📦', category: 'tool' },
    { name: 'Vite', icon: '⚡', category: 'tool' },
    { name: 'Cursor', icon: '🖱️', category: 'tool' }
  ];

  databases: Skill[] = [
    { name: 'MySQL', icon: '🗄️', category: 'database' },
    { name: 'PostgreSQL', icon: '🐘', category: 'database' },
    { name: 'MongoDB', icon: '🍃', category: 'database' },
    { name: 'Redis', icon: '🔴', category: 'database' }
  ];
}
