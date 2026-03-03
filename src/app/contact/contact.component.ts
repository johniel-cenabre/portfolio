import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from '../components/window/window.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, WindowComponent],
  template: `
    <app-window title="Contact" icon="📧" closeRoute="/">
      <div class="space-y-6">
        <!-- Email Section -->
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 bg-windows-blue/10 rounded-lg flex items-center justify-center">
            <span class="text-2xl">📧</span>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-lg text-gray-800 mb-1">Email</h3>
            <a href="mailto:johniel.judah.cenabre@gmail.com" 
               class="text-windows-blue hover:underline text-base">
              johniel.judah.cenabre&#64;gmail.com
            </a>
          </div>
        </div>

        <!-- Phone Section -->
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 bg-windows-blue/10 rounded-lg flex items-center justify-center">
            <span class="text-2xl">📱</span>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-lg text-gray-800 mb-1">Phone</h3>
            <a href="tel:+1234567890" 
               class="text-windows-blue hover:underline text-base">
              +63 938 078 2632
            </a>
          </div>
        </div>

        <!-- Location Section -->
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 bg-windows-blue/10 rounded-lg flex items-center justify-center">
            <span class="text-2xl">📍</span>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-lg text-gray-800 mb-1">Location</h3>
            <p class="text-gray-700 text-base">
              Lapu-Lapu City, Philippines
            </p>
          </div>
        </div>

        <!-- Social Links Section -->
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 bg-windows-blue/10 rounded-lg flex items-center justify-center">
            <span class="text-2xl">🔗</span>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-lg text-gray-800 mb-3">Connect With Me</h3>
            <div class="flex flex-wrap gap-4">
              <a href="https://www.linkedin.com/in/johniel-judah-cenabre-482376198/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="flex items-center gap-2 text-windows-blue hover:underline">
                <span class="text-xl">💼</span>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/johniel-cenabre" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="flex items-center gap-2 text-windows-blue hover:underline">
                <span class="text-xl">💻</span>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Availability Section -->
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 bg-windows-blue/10 rounded-lg flex items-center justify-center">
            <span class="text-2xl">⏰</span>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-lg text-gray-800 mb-1">Availability</h3>
            <p class="text-gray-700 text-base">
              Open to new opportunities and collaborations. Feel free to reach out!
            </p>
          </div>
        </div>
      </div>
    </app-window>
  `
})
export class ContactComponent {
}
