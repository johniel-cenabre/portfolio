import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from '../components/window/window.component';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  url?: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, WindowComponent],
  template: `
    <app-window title="Blog" icon="📝" closeRoute="/">
      <div class="space-y-6">
        <div *ngFor="let post of blogPosts" 
             class="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-3">
            <h3 class="font-bold text-xl text-gray-900">{{ post.title }}</h3>
            <span class="px-3 py-1 bg-windows-blue/10 text-windows-blue rounded-full text-xs font-semibold">
              {{ post.category }}
            </span>
          </div>
          
          <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div class="flex items-center gap-1">
              <span>📅</span>
              <span>{{ post.date }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span>⏱️</span>
              <span>{{ post.readTime }} read</span>
            </div>
          </div>

          <p class="text-gray-700 mb-4">{{ post.excerpt }}</p>

          <a *ngIf="post.url" 
             [href]="post.url" 
             target="_blank"
             rel="noopener noreferrer"
             class="text-windows-blue hover:underline font-semibold inline-flex items-center gap-2">
            Read More →
          </a>
        </div>

        <!-- Empty State -->
        <div *ngIf="blogPosts.length === 0" class="text-center py-12">
          <span class="text-6xl mb-4 block">📝</span>
          <p class="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
        </div>
      </div>
    </app-window>
  `
})
export class BlogComponent {
  blogPosts: BlogPost[] = [
    {
      title: 'Getting Started with Angular: A Beginner\'s Guide',
      date: 'March 15, 2024',
      excerpt: 'Learn the fundamentals of Angular framework, from setting up your first project to understanding components, services, and dependency injection.',
      category: 'Tutorial',
      readTime: '5 min',
      url: '#'
    },
    {
      title: 'Building Scalable Web Applications: Best Practices',
      date: 'February 28, 2024',
      excerpt: 'Explore strategies for building applications that can grow with your user base. We\'ll cover architecture patterns, performance optimization, and scalability considerations.',
      category: 'Development',
      readTime: '8 min',
      url: '#'
    },
    {
      title: 'My Journey into Full-Stack Development',
      date: 'February 10, 2024',
      excerpt: 'A personal reflection on my career transition into full-stack development, the challenges I faced, and the lessons I learned along the way.',
      category: 'Career',
      readTime: '6 min',
      url: '#'
    },
    {
      title: 'TypeScript Tips and Tricks for Better Code',
      date: 'January 25, 2024',
      excerpt: 'Discover advanced TypeScript features and patterns that can help you write more maintainable and type-safe code in your projects.',
      category: 'Tips',
      readTime: '7 min',
      url: '#'
    },
    {
      title: 'The Future of Web Development: Trends to Watch',
      date: 'January 5, 2024',
      excerpt: 'An overview of emerging technologies and trends in web development, from AI integration to new frameworks and tools shaping the industry.',
      category: 'Technology',
      readTime: '10 min',
      url: '#'
    }
  ];
}
