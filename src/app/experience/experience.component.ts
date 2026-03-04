import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from '../components/window/window.component';

interface WorkExperience {
  company: string;
  companyLogo: string;
  companyLogoDimensions: string;
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
          <div class="flex gap-2 md:gap-4">
            <!-- Timeline Indicator -->
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 md:w-12 md:h-12 bg-windows-blue/10 dark:bg-blue-100/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-lg md:text-2xl">💼</span>
              </div>
              <div *ngIf="!last" class="w-0.5 h-full bg-gray-300 mt-2 min-h-[50px]"></div>
            </div>

            <!-- Experience Content -->
            <div class="flex-1">
              <div class="bg-gray-50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-5 hover:shadow-md transition-shadow">
                <!-- Header -->
                <div class="mb-3">
                  <h3 class="font-bold text-xl text-gray-900 mb-1">{{ exp.position }}</h3>
                  <div class="flex items-center gap-2 text-windows-blue font-semibold text-lg mb-1">
                    <img [src]="exp.companyLogo" alt="Company Logo" [class]="exp.companyLogoDimensions">
                    <span>{{ exp.company }}</span>
                  </div>
                  <div class="flex items-center gap-4 text-xs md:text-sm text-gray-600 mt-2">
                    <div class="flex items-center gap-1">
                      <span>📅</span>
                      <span>{{ exp.startDate }} - {{ exp.endDate }}</span>
                    </div>
                    <div class="flex items-center gap-1 text-xs md:text-sm">
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
      company: 'Altitude Games',
      companyLogo: 'https://altitude-games.com/wp-content/uploads/2023/11/Logo_header_320x132_Animated.gif',
      companyLogoDimensions: 'h-6 w-auto',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: 'Oct 2024',
      endDate: 'Present',
      description: [
        'Developed and maintained web applications using Vue.js, TypeScript, and Laravel',
        'Built responsive front-end applications using Vue.js',
        'Implemented RESTful APIs using Laravel',
        'Participated in agile development processes and sprint planning',
        'Reviewed and provided feedback on code quality and performance'
      ],
      technologies: ['Vue.js', 'TypeScript', 'Laravel', 'AWS', 'Docker']
    },
    {
      company: 'Swiftpay',
      companyLogo: 'https://swiftpay.ph/wp-content/uploads/2024/10/swiftpay_logo_bg_transparent_ogimage.png',
      companyLogoDimensions: 'h-12 w-auto',
      position: 'Frontend Developer',
      location: 'Remote',
      startDate: 'Dec 2022',
      endDate: 'Aug 2024',
      description: [
        'Developed and maintained RESTful APIs using Node.js and Express',
        'Built responsive front-end applications using React and Angular',
        'Implemented CI/CD pipelines for automated deployment',
        'Participated in agile development processes and sprint planning'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Git', 'Jenkins']
    },
    {
      company: 'Offshorly',
      companyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ5BqUilItp-2wyfgPgYVpMGtNJ1sHj_aj9g&s',
      companyLogoDimensions: 'h-3 w-auto',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: 'May 2021',
      endDate: 'Nov 2022',
      description: [
        'Developed features for web applications using React and Angular',
        'Fixed bugs and improved existing codebase',
        'Participated in team meetings and contributed to technical discussions',
        'Implemented best practices in software development and version control'
      ],
      technologies: ['JavaScript', 'React', 'Angular', 'AWS', 'Node.js']
    },
    {
      company: 'Panteum',
      companyLogo: 'https://avatars.githubusercontent.com/u/50278170?s=200&v=4',
      companyLogoDimensions: 'h-6 w-auto',
      position: 'Blockchain Developer',
      location: 'Cebu City, Philippines',
      startDate: 'Feb 2020',
      endDate: 'March 2021',
      description: [
        'Developed and maintained blockchain applications using Solidity and React',
        'Built responsive front-end applications using React',
        'Implemented smart contracts using Solidity',
        'Participated in agile development processes and sprint planning',
        'Reviewed and provided feedback on code quality and performance'
      ],
      technologies: ['Solidity', 'React', 'Node.js', 'Express']
    },
    {
      company: 'Fullspeed Technologies',
      companyLogo: 'data:image/jpeg;base64,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7DYEcnMPEgTMCywGrdLTskfbMc17Cw0e5o9wCiRW4dNWVUIqY54omSDNCzojIOjP0b5DnBcXNs6zctr2ubXM9ELPBK8zwB7mhrw57HtBuA+J7o3gHi3Mw2PKyiUuMBq3zU7ZH2zFzxoLDqyOaPcAkjzxutkZ0UUOXpZ5MjXOBLWAMdI6RwBBdZrCALi5c3UC6CPJNVU8kXSyMlikeI3fweR7HPByPBDiHNLgG2tfrA30sgkY7XSRiOOEN6WeTo2F4JYyzHyOkcAQXAMjdpcXNhcXukIc0LZ2y2kqY5BY3Z0Qa8O0IIIfo219CDvGvMl3q6t7aqCIWyyNlLtNeoGZbcu0UETHK2Vs8ETJWRCRspc97Q76PJZou4W7R9iQJ+GZ8hL5mza6Oa0NAH2dHG+t0FNTYjPNUyxiphidHIWimdHmkMbTYSuu8Eh4BcC0AAEbyCpQ0gUJcoCAgICAgICCufSPNa2bTIIHsOuuZz2OGnKzSg67SUb5qSSJjQ5zgLNJABs4EtN+4KYHTCo3Nef4myAEava6PXk2zRf/AGUDzrqWeOq9agY2TPE2KWMvyOtG5743sJBaSDJIC02vmBv1bGRY0M0rwTJF0eugzhxItvNhYa8ASoFfh+CRh875YY3GSdz2kta45S1oFyR3HRNx77PUToaZsTgAQ6TQbgHSPc0DyISRAiwN5o2R3DJ4nvkik7QY8veWk82lrsrhxDnDvU7ids1SyxUkbJQGyAEuDTmaC5xdYGwuNd6iRX4bHWUsIpmU7JWxjLC8Shg6MfRtkBaSwgWaS0PvlvpfKJ33Qs8DoXQQBjnBzy58jyAQC+V7pX5b/VzPIHcAolKvwX1uGNsLqYEB7+uJmWyvkc7Na19ztymRMxuilf0UsOXpIJC8NcSGvDmOjfGSAS3R9wbHVreF0gRpYqqoliD4hDFHIJHXkD3vcwHo2NDdGtzEOLib9S2XW4chJx2ileIpIcvSwSdI1ryQ192PjdG4gEtu2R2tjYgGx3KIEGKhlkrIqh1KyEsz53lzDI/MzI1oyjUd5I3DRSLKrpHuqoJRbLG2UO1164Zl8eyVAh4/QvfPBIIGztjbKHMcWjV+TK4ZhY9k+1TAn4WCIyDAILE2Y0tI55uroNbqBTbSUlTUxyQeqx3NxHOZRaM/UqBZudsjdHWbxFs3FTCGlaNOff8ANQlygICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg//Z',
      companyLogoDimensions: 'h-8 w-auto',
      position: 'Junior Software Engineer',
      location: 'Cebu City, Philippines',
      startDate: 'Nov 2018',
      endDate: 'Feb 2020',
      description: [
        'Developed and maintained web applications using PHP and MySQL',
        'Built responsive front-end applications using React and Vue.js',
        'Implemented RESTful APIs using Laravel',
        'Participated in agile development processes and sprint planning',
        'Reviewed and provided feedback on code quality and performance'
      ],
      technologies: ['PHP', 'MySQL', 'Vue.js', 'React', 'Laravel', 'AWS', 'Docker']
    },
  ];
}
