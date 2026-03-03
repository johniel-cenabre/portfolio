import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface DesktopIcon {
  name: string;
  icon: string;
  route: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isDragging: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let icon of desktopIcons; let i = index" 
         (dblclick)="openSection(icon.route)"
         (mousedown)="startDrag($event, i)"
         (touchstart)="startDragTouch($event, i)"
         [class.cursor-grabbing]="icon.isDragging"
         [class.cursor-grab]="!icon.isDragging"
         class="absolute group select-none touch-none"
         [style.left.px]="icon.x"
         [style.top.px]="icon.y"
         [style.z-index]="icon.isDragging ? 1000 : 10">
      <div class="flex flex-col items-center w-16 hover:bg-windows-blue/20 rounded px-1 py-1 transition-colors">
        <span class="text-3xl">{{ icon.icon }}</span>
        <span class="text-white text-sm text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] max-w-[70px] break-words">
          {{ icon.name }}
        </span>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  desktopIcons: DesktopIcon[] = [
    { name: 'Bio', icon: '📧', route: 'bio', x: 20, y: 20, vx: 0, vy: 0, isDragging: false },
    { name: 'Skills', icon: '⚡', route: 'skills', x: 20, y: 100, vx: 0, vy: 0, isDragging: false },
    { name: 'Experience', icon: '💻', route: 'experience', x: 20, y: 180, vx: 0, vy: 0, isDragging: false },
    { name: 'Projects', icon: '💼', route: 'projects', x: 20, y: 260, vx: 0, vy: 0, isDragging: false },
    { name: 'Education', icon: '🎓', route: 'education', x: 20, y: 340, vx: 0, vy: 0, isDragging: false },
    { name: 'Contact', icon: '👤', route: 'contact', x: 20, y: 420, vx: 0, vy: 0, isDragging: false },
    { name: 'Games', icon: '🎮', route: 'games', x: 20, y: 500, vx: 0, vy: 0, isDragging: false },
    { name: 'Blog', icon: '📝', route: 'blog', x: 20, y: 580, vx: 0, vy: 0, isDragging: false }
  ];

  private draggedIconIndex: number | null = null;
  private dragOffset = { x: 0, y: 0 };
  private lastMousePos = { x: 0, y: 0 };
  private lastTouchPos = { x: 0, y: 0 };
  private animationFrameId: number | null = null;
  private isTouch = false;
  private readonly FRICTION = 0.95;
  private readonly BOUNCE = 0.7;
  private readonly ICON_SIZE = 64;
  private readonly DESKTOP_PADDING = 16;

  ngOnInit() {
    this.startPhysicsLoop();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  startDrag(event: MouseEvent, index: number) {
    event.preventDefault();
    this.isTouch = false;
    const icon = this.desktopIcons[index];
    icon.isDragging = true;
    this.draggedIconIndex = index;
    
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.dragOffset.x = event.clientX - rect.left - this.ICON_SIZE / 2;
    this.dragOffset.y = event.clientY - rect.top - this.ICON_SIZE / 2;
    this.lastMousePos = { x: event.clientX, y: event.clientY };
    
    icon.vx = 0;
    icon.vy = 0;
  }

  startDragTouch(event: TouchEvent, index: number) {
    event.preventDefault();
    this.isTouch = true;
    const icon = this.desktopIcons[index];
    icon.isDragging = true;
    this.draggedIconIndex = index;
    
    const touch = event.touches[0];
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.dragOffset.x = touch.clientX - rect.left - this.ICON_SIZE / 2;
    this.dragOffset.y = touch.clientY - rect.top - this.ICON_SIZE / 2;
    this.lastTouchPos = { x: touch.clientX, y: touch.clientY };
    
    icon.vx = 0;
    icon.vy = 0;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.draggedIconIndex !== null && !this.isTouch) {
      this.updateDragPosition(event.clientX, event.clientY);
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.draggedIconIndex !== null && event.touches.length > 0) {
      event.preventDefault();
      const touch = event.touches[0];
      this.updateDragPosition(touch.clientX, touch.clientY);
    }
  }

  private updateDragPosition(clientX: number, clientY: number) {
    if (this.draggedIconIndex === null) return;
    
    const icon = this.desktopIcons[this.draggedIconIndex];
    const desktopRect = document.querySelector('.flex-1')?.getBoundingClientRect();
    if (desktopRect) {
      const newX = clientX - desktopRect.left - this.dragOffset.x;
      const newY = clientY - desktopRect.top - this.dragOffset.y;
      
      // Calculate velocity
      icon.vx = (newX - icon.x) * 0.5;
      icon.vy = (newY - icon.y) * 0.5;
      
      icon.x = Math.max(this.DESKTOP_PADDING, Math.min(newX, window.innerWidth - this.ICON_SIZE - this.DESKTOP_PADDING));
      icon.y = Math.max(this.DESKTOP_PADDING, Math.min(newY, window.innerHeight - 40 - this.ICON_SIZE - this.DESKTOP_PADDING));
      
      if (this.isTouch) {
        this.lastTouchPos = { x: clientX, y: clientY };
      } else {
        this.lastMousePos = { x: clientX, y: clientY };
      }
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.draggedIconIndex !== null && !this.isTouch) {
      this.endDrag();
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (this.draggedIconIndex !== null) {
      event.preventDefault();
      this.endDrag();
    }
  }

  @HostListener('touchcancel', ['$event'])
  onTouchCancel(event: TouchEvent) {
    if (this.draggedIconIndex !== null) {
      event.preventDefault();
      this.endDrag();
    }
  }

  private endDrag() {
    if (this.draggedIconIndex !== null) {
      this.desktopIcons[this.draggedIconIndex].isDragging = false;
      this.draggedIconIndex = null;
      this.isTouch = false;
    }
  }

  startPhysicsLoop() {
    const update = () => {
      this.updatePhysics();
      this.animationFrameId = requestAnimationFrame(update);
    };
    update();
  }

  updatePhysics() {
    const desktopWidth = window.innerWidth;
    const desktopHeight = window.innerHeight - 40; // Account for taskbar

    for (let i = 0; i < this.desktopIcons.length; i++) {
      const icon = this.desktopIcons[i];
      
      if (!icon.isDragging) {
        // Apply friction
        icon.vx *= this.FRICTION;
        icon.vy *= this.FRICTION;
        
        // Update position
        icon.x += icon.vx;
        icon.y += icon.vy;
        
        // Boundary collision
        if (icon.x < this.DESKTOP_PADDING) {
          icon.x = this.DESKTOP_PADDING;
          icon.vx *= -this.BOUNCE;
        }
        if (icon.x > desktopWidth - this.ICON_SIZE - this.DESKTOP_PADDING) {
          icon.x = desktopWidth - this.ICON_SIZE - this.DESKTOP_PADDING;
          icon.vx *= -this.BOUNCE;
        }
        if (icon.y < this.DESKTOP_PADDING) {
          icon.y = this.DESKTOP_PADDING;
          icon.vy *= -this.BOUNCE;
        }
        if (icon.y > desktopHeight - this.ICON_SIZE - this.DESKTOP_PADDING) {
          icon.y = desktopHeight - this.ICON_SIZE - this.DESKTOP_PADDING;
          icon.vy *= -this.BOUNCE;
        }
        
        // Icon-to-icon collision
        for (let j = i + 1; j < this.desktopIcons.length; j++) {
          this.checkCollision(icon, this.desktopIcons[j]);
        }
        
        // Stop very small velocities
        if (Math.abs(icon.vx) < 0.1) icon.vx = 0;
        if (Math.abs(icon.vy) < 0.1) icon.vy = 0;
      }
    }
  }

  checkCollision(icon1: DesktopIcon, icon2: DesktopIcon) {
    const dx = (icon1.x + this.ICON_SIZE / 2) - (icon2.x + this.ICON_SIZE / 2);
    const dy = (icon1.y + this.ICON_SIZE / 2) - (icon2.y + this.ICON_SIZE / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = this.ICON_SIZE;

    if (distance < minDistance && distance > 0) {
      // Collision detected
      const angle = Math.atan2(dy, dx);
      const overlap = minDistance - distance;
      
      // Separate icons
      const separationX = Math.cos(angle) * overlap * 0.5;
      const separationY = Math.sin(angle) * overlap * 0.5;
      
      icon1.x += separationX;
      icon1.y += separationY;
      icon2.x -= separationX;
      icon2.y -= separationY;
      
      // Exchange velocities with bounce
      const relativeVx = icon1.vx - icon2.vx;
      const relativeVy = icon1.vy - icon2.vy;
      const dotProduct = relativeVx * dx + relativeVy * dy;
      
      if (dotProduct > 0) {
        const impulse = (2 * dotProduct) / (distance * distance);
        icon1.vx -= impulse * dx * this.BOUNCE;
        icon1.vy -= impulse * dy * this.BOUNCE;
        icon2.vx += impulse * dx * this.BOUNCE;
        icon2.vy += impulse * dy * this.BOUNCE;
      }
    }
  }

  openSection(route: string) {
    if (route) {
      this.router.navigate([`/${route}`]);
    }
  }
}
