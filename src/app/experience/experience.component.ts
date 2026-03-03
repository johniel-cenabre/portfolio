import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from '../components/window/window.component';

interface WorkExperience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies?: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, WindowComponent],
  template: `
    <app-window title="Experience" icon="💻" closeRoute="/">
      <div class="space-y-6">
        <div *ngFor="let exp of experiences; let last = last" class="relative">
          <!-- Experience Card -->
          <div class="flex gap-4">
            <!-- Timeline Indicator -->
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 bg-windows-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-2xl">💼</span>
              </div>
              <div *ngIf="!last" class="w-0.5 h-full bg-gray-300 mt-2 min-h-[50px]"></div>
            </div>

            <!-- Experience Content -->
            <div class="flex-1 pb-6">
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <!-- Header -->
                <div class="mb-3">
                  <h3 class="font-bold text-xl text-gray-900 mb-1">{{ exp.position }}</h3>
                  <div class="flex items-center gap-2 text-windows-blue font-semibold text-lg mb-1">
                    <span>🏢</span>
                    <span>{{ exp.company }}</span>
                  </div>
                  <div class="flex items-center gap-4 text-sm text-gray-600 mt-2">
                    <div class="flex items-center gap-1">
                      <span>📅</span>
                      <span>{{ exp.startDate }} - {{ exp.endDate }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <span>📍</span>
                      <span>{{ exp.location }}</span>
                    </div>
                  </div>
                </div>

                <!-- Description -->
                <div class="mb-3">
                  <h4 class="font-semibold text-gray-800 mb-2">Key Responsibilities:</h4>
                  <ul class="list-disc list-inside space-y-1 text-gray-700">
                    <li *ngFor="let item of exp.description">{{ item }}</li>
                  </ul>
                </div>

                <!-- Technologies -->
                <div *ngIf="exp.technologies && exp.technologies.length > 0" class="mt-3">
                  <h4 class="font-semibold text-gray-800 mb-2">Technologies:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span *ngFor="let tech of exp.technologies" 
                          class="px-3 py-1 bg-windows-blue/10 text-windows-blue rounded-full text-sm font-medium">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State (if no experiences) -->
        <div *ngIf="experiences.length === 0" class="text-center py-12">
          <span class="text-6xl mb-4 block">📋</span>
          <p class="text-gray-600 text-lg">No work experience added yet.</p>
        </div>
      </div>
    </app-window>
  `
})
export class ExperienceComponent {
  experiences: WorkExperience[] = [
    {
      company: 'Example Tech Company',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: [
        'Led development of scalable web applications using modern frameworks',
        'Collaborated with cross-functional teams to deliver high-quality software solutions',
        'Mentored junior developers and conducted code reviews',
        'Optimized application performance resulting in 40% improvement in load times'
      ],
      technologies: ['Angular', 'TypeScript', 'Node.js', 'AWS', 'Docker']
    },
    {
      company: 'Previous Company Inc.',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: 'Jun 2020',
      endDate: 'Dec 2021',
      description: [
        'Developed and maintained RESTful APIs using Node.js and Express',
        'Built responsive front-end applications using React and Angular',
        'Implemented CI/CD pipelines for automated deployment',
        'Participated in agile development processes and sprint planning'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Git', 'Jenkins']
    },
    {
      company: 'Startup Solutions',
      position: 'Junior Developer',
      location: 'New York, NY',
      startDate: 'Jan 2019',
      endDate: 'May 2020',
      description: [
        'Developed features for web applications using JavaScript and Python',
        'Fixed bugs and improved existing codebase',
        'Participated in team meetings and contributed to technical discussions',
        'Learned best practices in software development and version control'
      ],
      technologies: ['JavaScript', 'Python', 'HTML', 'CSS', 'Git']
    }
  ];
}
