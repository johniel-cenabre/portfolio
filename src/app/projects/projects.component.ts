import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from '../components/window/window.component';

interface Project {
  title: string;
  description: string;
  type: 'company' | 'personal';
  technologies: string[];
  url?: string;
  githubUrl?: string;
  image?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, WindowComponent],
  template: `
    <app-window title="Projects" icon="💼" closeRoute="/">
      <div class="space-y-8">
        <!-- Company Projects -->
        <div>
          <h3 class="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
            <span>🏢</span>
            <span>Company Projects</span>
          </h3>
          <div class="space-y-4">
            <div *ngFor="let project of companyProjects" 
                 class="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between mb-3">
                <h4 class="font-bold text-lg text-gray-900">{{ project.title }}</h4>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  Company
                </span>
              </div>
              <p class="text-gray-700 mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span *ngFor="let tech of project.technologies" 
                      class="px-3 py-1 bg-windows-blue/10 text-windows-blue rounded-full text-sm font-medium">
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-3">
                <a *ngIf="project.url" 
                   [href]="project.url" 
                   target="_blank"
                   rel="noopener noreferrer"
                   class="text-windows-blue hover:underline font-semibold">
                  🔗 View Project
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Personal Projects -->
        <div>
          <h3 class="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
            <span>👤</span>
            <span>Personal Projects</span>
          </h3>
          <div class="space-y-4">
            <div *ngFor="let project of personalProjects" 
                 class="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between mb-3">
                <h4 class="font-bold text-lg text-gray-900">{{ project.title }}</h4>
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  Personal
                </span>
              </div>
              <p class="text-gray-700 mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span *ngFor="let tech of project.technologies" 
                      class="px-3 py-1 bg-windows-blue/10 text-windows-blue rounded-full text-sm font-medium">
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-3">
                <a *ngIf="project.url" 
                   [href]="project.url" 
                   target="_blank"
                   rel="noopener noreferrer"
                   class="text-windows-blue hover:underline font-semibold">
                  🔗 View Project
                </a>
                <a *ngIf="project.githubUrl" 
                   [href]="project.githubUrl" 
                   target="_blank"
                   rel="noopener noreferrer"
                   class="text-windows-blue hover:underline font-semibold">
                  💻 GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-window>
  `
})
export class ProjectsComponent {
  companyProjects: Project[] = [
    {
      title: 'Gaming Platform',
      description: 'Built a scalable gaming platform serving thousands of users daily. Implemented security, customer interaction tracking, online stores, and prize/reward systems.',
      type: 'company',
      technologies: ['Vue.js', 'Laravel', 'TypeScript', 'Express.js', 'PostgreSQL', 'AWS', 'Docker'],
      url: 'https://www.sweepz.com'
    },
    {
      title: 'Payment Gateway',
      description: 'Developed a comprehensive payment gateway with real-time analytics, wallet/bank integrations, and automated reporting features.',
      type: 'company',
      technologies: ['React', 'TypeScript', 'MongoDB', 'Express.js', 'Redis', 'AWS', 'Docker'],
      url: 'https://merchant.live.swiftpay.ph/'
    }
  ];

  personalProjects: Project[] = [
    {
      title: 'Portfolio Website',
      description: 'A modern portfolio website showcasing my work, skills, and experience. Built with Angular and Tailwind CSS.',
      type: 'personal',
      technologies: ['Angular', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/johniel-cenabre/portfolio'
    },
    {
      title: 'Church Website',
      description: 'A modern website for our church to showcase our services, events, and ministries.',
      type: 'personal',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      url: 'https://www.jtwtl.site',
      githubUrl: 'https://github.com/johniel-cenabre/church-website'
    },
    {
      title: 'Task Management App',
      description: 'A full-stack task management application with user authentication, real-time updates, and collaborative features.',
      type: 'personal',
      technologies: ['Vue.js', 'Node.js', 'IndexedDB', 'Tailwind CSS'],
      githubUrl: 'https://github.com/johniel-cenabre/task-manager'
    },
    {
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard that displays current conditions and forecasts using weather APIs.',
      type: 'personal',
      technologies: ['React', 'JavaScript', 'CSS3', 'Weather API'],
      url: '#',
      githubUrl: 'https://github.com/yourusername/weather-dashboard'
    }
  ];
}
