import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Modal Overlay -->
    <div class="fixed top-10 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-50 pointer-events-auto">
      <!-- Window Container -->
      <div class="bg-windows-light-gray border-2 border-black shadow-2xl w-full h-full flex flex-col pointer-events-auto">
        <!-- Window Title Bar -->
        <div class="bg-windows-blue text-white px-3 py-2 flex items-center justify-between border-b-2 border-black h-10">
          <div class="flex items-center gap-2">
            <span class="text-lg">{{ icon }}</span>
            <span class="font-bold">{{ title }}</span>
          </div>
          <button (click)="onClose()" 
                  class="w-7 h-7 bg-windows-gray border-2 border-t-white border-l-white border-r-black border-b-black hover:bg-red-500 active:border-t-black active:border-l-black active:border-r-white active:border-b-white flex items-center justify-center text-base font-bold transition-colors">
            ×
          </button>
        </div>

        <!-- Window Content -->
        <div class="p-6 bg-white overflow-y-auto flex-1">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class WindowComponent {
  @Input() title: string = 'Window';
  @Input() icon: string = '📄';
  @Input() closeRoute: string = '/';
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  onClose() {
    this.close.emit();
    if (this.closeRoute) {
      this.router.navigate([this.closeRoute]);
    }
  }
}
