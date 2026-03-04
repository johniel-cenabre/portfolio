import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from '../components/window/window.component';

interface Education {
  institution: string;
  logo: string;
  logoDimensions: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  achievements?: string[];
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, WindowComponent],
  template: `
    <app-window title="Education" icon="🎓" closeRoute="/">
      <div class="space-y-6">
        <div *ngFor="let edu of education; let last = last" class="relative">
          <!-- Education Card -->
          <div class="flex gap-2 md:gap-4">
            <!-- Timeline Indicator -->
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 md:w-12 md:h-12 bg-windows-blue/10 dark:bg-blue-100/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-lg md:text-2xl">🎓</span>
              </div>
              <div *ngIf="!last" class="w-0.5 h-full bg-gray-300 mt-2 min-h-[50px]"></div>
            </div>

            <!-- Education Content -->
            <div class="flex-1">
              <div class="bg-gray-50 dark:bg-gray-90/300 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-5 hover:shadow-md transition-shadow">
                <!-- Header -->
                <div class="mb-3">
                  <h3 class="font-bold text-xl text-gray-900 mb-1">{{ edu.degree }}</h3>
                  <div class="flex items-center gap-2 text-windows-blue font-semibold text-lg mb-1">
                    <img [src]="edu.logo" alt="Institution Logo" [class]="edu.logoDimensions">
                    <span>{{ edu.institution }}</span>
                  </div>
                  <div class="text-gray-600 mb-2">
                    <span class="font-medium">{{ edu.field }}</span>
                  </div>
                  <div class="flex items-center gap-4 text-sm text-gray-600">
                    <div class="flex items-center gap-1">
                      <span>📅</span>
                      <span>{{ edu.startDate }} - {{ edu.endDate }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <span>📍</span>
                      <span>{{ edu.location }}</span>
                    </div>
                  </div>
                </div>

                <!-- Description -->
                <p *ngIf="edu.description" class="text-gray-700 mb-3">
                  {{ edu.description }}
                </p>

                <!-- Achievements -->
                <div *ngIf="edu.achievements && edu.achievements.length > 0" class="mt-3">
                  <h4 class="font-semibold text-gray-800 mb-2">Key Achievements:</h4>
                  <ul class="list-disc list-inside space-y-1 text-gray-700">
                    <li *ngFor="let achievement of edu.achievements">{{ achievement }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="education.length === 0" class="text-center py-12">
          <span class="text-6xl mb-4 block">🎓</span>
          <p class="text-gray-600 text-lg">No education information added yet.</p>
        </div>
      </div>
    </app-window>
  `
})
export class EducationComponent {
  education: Education[] = [
    {
      institution: 'Asian College of Technology',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTXIK0A4ygKP37up5CHwyy0_UDttWVHrsmFTPa34tDpwLwIxCaulb7wdg&s=10',
      logoDimensions: 'h-6 w-auto',
      degree: 'Bachelor of Science',
      field: 'Information Technology',
      location: 'Cebu City, Philippines',
      startDate: '2015',
      endDate: '2019',
      description: 'Focused on software engineering, algorithms, data structures, and web development. Completed various projects in software design and development.',
      achievements: [
        'Dean\'s List for 3 semesters',
        'Completed senior capstone project on School Management System',
        'Active member of Computer Science Club'
      ]
    },
    {
      institution: 'The Tech Bootcamp',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjaaxM9KZBRsbTdamk4L7h082fdNjgoGLE-g&s',
      logoDimensions: 'h-8 w-auto',
      degree: 'Full Stack Web Development',
      field: 'Web Development',
      location: 'Online',
      startDate: '2020',
      endDate: '2020',
      description: 'Intensive 12-week program covering modern web development technologies including React, Node.js, and databases.',
      achievements: [
        'Completed 5 full-stack projects',
        'Learned agile development methodologies',
        'Participated in hackathons and coding challenges'
      ]
    }
  ];
}
