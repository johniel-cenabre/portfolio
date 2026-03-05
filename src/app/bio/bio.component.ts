import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from '../components/window/window.component';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [CommonModule, WindowComponent],
  template: `
    <app-window title="Bio" icon="📧" closeRoute="/">
      <div class="space-y-6">
        <!-- Profile Section -->
        <div class="flex items-start gap-6">
          <div class="flex-shrink-0 w-32 h-32 bg-windows-blue/10 rounded-lg flex items-center justify-center">
            <img src="https://media.licdn.com/dms/image/v2/D5603AQFKqzbVHl2P3Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729473542213?e=1774483200&v=beta&t=47RS5e-tjONQzoWpH3ifEupx68hj3f7YT4vIkPVmN50" alt="Johniel Judah Cenabre" class="w-full h-full object-cover rounded-lg">
          </div>
          <div class="flex-1">
            <h2 class="font-bold text-2xl text-gray-900 dark:text-gray-200 mb-2">Johniel Judah Cenabre</h2>
            <p class="text-windows-blue font-semibold text-lg mb-3">Software Developer</p>
            <p class="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              Passionate software developer with a love for creating innovative solutions and 
              building user-friendly applications. I enjoy working with modern technologies and 
              continuously learning new skills to stay at the forefront of software development.
            </p>
          </div>
        </div>

        <!-- About Section -->
        <div class="border-t border-gray-200 pt-6">
          <h3 class="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
            <span>📝</span>
            <span>About Me</span>
          </h3>
          <div class="space-y-3 text-gray-700 dark:text-gray-300">
            <p>
              I'm a dedicated software developer with expertise in full-stack development, 
              focusing on creating scalable and maintainable applications. My journey in 
              software development has been driven by curiosity and a passion for solving 
              complex problems.
            </p>
            <p>
              When I'm not coding, I enjoy coding personal projects, writing 
              technical blogs, and exploring new technologies. I believe in continuous 
              learning and sharing knowledge with the developer community.
            </p>
          </div>
        </div>

        <!-- Interests Section -->
        <div class="border-t border-gray-200 pt-6">
          <h3 class="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
            <span>🎯</span>
            <span>Interests</span>
          </h3>
          <div class="flex flex-wrap gap-3">
            <span class="px-4 py-2 bg-windows-blue/10 text-windows-blue rounded-lg text-sm font-medium">
              Web Development
            </span>
            <span class="px-4 py-2 bg-windows-blue/10 text-windows-blue rounded-lg text-sm font-medium">
              Mobile Apps
            </span>
            <span class="px-4 py-2 bg-windows-blue/10 text-windows-blue rounded-lg text-sm font-medium">
              Tech Blogging
            </span>
            <span class="px-4 py-2 bg-windows-blue/10 text-windows-blue rounded-lg text-sm font-medium">
              UI/UX Design
            </span>
            <span class="px-4 py-2 bg-windows-blue/10 text-windows-blue rounded-lg text-sm font-medium">
              AI/Machine Learning
            </span>
            <span class="px-4 py-2 bg-windows-blue/10 text-windows-blue rounded-lg text-sm font-medium">
              Game Development
            </span>
          </div>
        </div>
      </div>
    </app-window>
  `
})
export class BioComponent {
}
