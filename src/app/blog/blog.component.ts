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
  content?: string[];
  image?: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, WindowComponent],
  template: `
    <app-window title="Blog" icon="📝" closeRoute="/">
      <div class="space-y-6">
        <div *ngFor="let post of blogPosts; let i = index" 
             class="bg-gray-50 border border-gray-200 rounded-lg p-5 md:p-6 hover:shadow-md transition-shadow">
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

          <button (click)="openPostModal(i)" 
                  class="text-windows-blue hover:underline font-semibold inline-flex items-center gap-2 cursor-pointer">
            Read More →
          </button>
        </div>

        <!-- Empty State -->
        <div *ngIf="blogPosts.length === 0" class="text-center py-12">
          <span class="text-6xl mb-4 block">📝</span>
          <p class="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
        </div>
      </div>

      <!-- Blog Post Modal -->
      <div *ngIf="selectedPostIndex !== null" 
           class="fixed top-10 left-0 right-0 bottom-0 inset-0 bg-black/50 dark:bg-black/70 z-[100] flex items-center justify-center"
           (click)="closePostModal()">
        <div class="bg-white dark:bg-gray-900 w-full h-full max-w-4xl rounded-lg shadow-2xl overflow-hidden flex flex-col"
             (click)="$event.stopPropagation()">
          <!-- Modal Header -->
          <div class="gap-12 bg-windows-blue dark:bg-dark-windows-blue text-white px-4 py-2 md:px-6 md:py-4 flex items-center justify-between border-b-2 border-black dark:border-gray-700">
            <div class="flex items-center gap-2">
              <h2 class="font-bold text-lg">{{ blogPosts[selectedPostIndex]?.title }}</h2>
            </div>
            <button (click)="closePostModal()" 
                    class="w-10 h-8 bg-windows-gray dark:bg-dark-windows-gray border-2 border-t-white border-l-white border-r-black border-b-black dark:border-t-gray-400 dark:border-l-gray-400 dark:border-r-gray-600 dark:border-b-gray-600 hover:bg-red-500 dark:hover:bg-red-600 flex items-center justify-center text-lg font-bold transition-colors text-white">
              ×
            </button>
          </div>

          <!-- Modal Content -->
          <div class="flex-1 overflow-y-auto p-4 md:p-6 dark:text-gray-100">
            <div *ngIf="blogPosts[selectedPostIndex]">
              <!-- Post Meta -->
              <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex-1 md:flex">
                  <div class="flex items-center gap-1">
                    <span>📅</span>
                    <span>{{ blogPosts[selectedPostIndex].date }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span>⏱️</span>
                    <span>{{ blogPosts[selectedPostIndex].readTime }} read</span>
                  </div>
                </div>
                <span class="px-3 py-1 bg-windows-blue/10 dark:bg-dark-windows-blue/30 text-windows-blue dark:text-dark-windows-blue rounded-full text-xs font-semibold">
                  {{ blogPosts[selectedPostIndex].category }}
                </span>
              </div>

              <!-- Featured Image -->
              <div *ngIf="blogPosts[selectedPostIndex].image" class="mb-6 rounded-lg overflow-hidden">
                <img [src]="blogPosts[selectedPostIndex].image" 
                     [alt]="blogPosts[selectedPostIndex].title"
                     class="w-full h-64 object-cover">
              </div>

              <!-- Post Content -->
              <div class="prose prose-lg dark:prose-invert max-w-none">
                <p *ngFor="let paragraph of blogPosts[selectedPostIndex].content" 
                   class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-window>
  `
})
export class BlogComponent {
  selectedPostIndex: number | null = null;

  blogPosts: BlogPost[] = [
    {
      title: 'Getting Started with Angular: A Beginner\'s Guide',
      date: 'March 15, 2024',
      excerpt: 'Learn the fundamentals of Angular framework, from setting up your first project to understanding components, services, and dependency injection.',
      category: 'Tutorial',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      content: [
        'Welcome to the exciting world of Angular! 🎉 If you\'re reading this, you\'re probably ready to dive into one of the most powerful frontend frameworks out there. Don\'t worry if it seems overwhelming at first – we\'ve all been there!',
        'Angular is like building with LEGO blocks, but for web applications. Each component is a building block that you can combine to create amazing user interfaces. The best part? Angular handles a lot of the heavy lifting for you, like data binding, routing, and state management.',
        'Let\'s start with the basics. When you create a new Angular project using `ng new`, Angular sets up a complete development environment for you. It includes TypeScript (which is like JavaScript with superpowers), a build system, and even a development server. Pretty cool, right?',
        'Components are the heart of Angular applications. Think of them as self-contained pieces of your UI that have their own logic and styling. Each component has a template (the HTML), a class (the TypeScript logic), and styles (the CSS). They work together like a well-orchestrated band!',
        'Services in Angular are perfect for sharing data and logic across components. They\'re like the backstage crew that makes everything run smoothly. Dependency injection (DI) is Angular\'s way of providing these services to components – it\'s like having a smart assistant that knows exactly what each component needs.',
        'One of my favorite Angular features is two-way data binding. It\'s like having a conversation where both sides listen and respond automatically. When you update data in your component, the view updates. When users interact with the view, your data updates. It\'s almost magical! ✨',
        'Remember, every expert was once a beginner. Start with simple components, experiment, break things (that\'s how we learn!), and gradually build more complex applications. The Angular community is incredibly supportive, so don\'t hesitate to ask questions and explore the documentation.'
      ]
    },
    {
      title: 'Building Scalable Web Applications: Best Practices',
      date: 'February 28, 2024',
      excerpt: 'Explore strategies for building applications that can grow with your user base. We\'ll cover architecture patterns, performance optimization, and scalability considerations.',
      category: 'Development',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      content: [
        'Building a web application is one thing, but building one that can scale gracefully as your user base grows? That\'s where the real challenge begins! 🚀 Think of scalability like planning a city – you need good infrastructure, clear organization, and room to grow.',
        'First things first: architecture matters. A well-structured application is like a well-organized library. Everything has its place, and you can find what you need quickly. I recommend following the separation of concerns principle – keep your business logic separate from your presentation layer, and your data access separate from both.',
        'Performance optimization is crucial for scalability. Lazy loading is your friend here! Instead of loading everything at once (like trying to carry all your groceries in one trip), load components and modules only when they\'re needed. This reduces initial load time and makes your app feel snappy.',
        'Caching strategies can make a huge difference. Think of caching like having a smart assistant who remembers frequently asked questions. Browser caching, service worker caching, and server-side caching all work together to reduce server load and improve response times.',
        'Database optimization is another key factor. Indexes are like the table of contents in a book – they help you find information quickly. Proper indexing, query optimization, and sometimes even database sharding can help your application handle millions of requests.',
        'Microservices architecture can be a game-changer for large applications. Instead of one monolithic application (like a giant castle), you have multiple smaller services (like a village of specialized buildings). Each service can scale independently based on demand.',
        'Monitoring and logging are your early warning systems. They\'re like having security cameras and sensors throughout your application. Tools like application performance monitoring (APM) help you identify bottlenecks before they become problems.',
        'Remember, scalability isn\'t just about handling more users – it\'s about maintaining performance, reliability, and developer productivity as your application grows. Plan ahead, but don\'t over-engineer. Start simple, measure, and optimize based on real needs!'
      ]
    },
    {
      title: 'My Journey into Full-Stack Development',
      date: 'February 10, 2024',
      excerpt: 'A personal reflection on my career transition into full-stack development, the challenges I faced, and the lessons I learned along the way.',
      category: 'Career',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
      content: [
        'Let me tell you a story about my journey into full-stack development. It\'s been a wild ride filled with "aha!" moments, frustrating bugs, and the satisfaction of seeing ideas come to life! 🎢',
        'I started as a frontend developer, comfortable with HTML, CSS, and JavaScript. I could make beautiful interfaces, but I always wondered: "What happens behind the scenes? How does data get from point A to point B?" That curiosity led me down the full-stack rabbit hole.',
        'The first time I built a complete application with both frontend and backend, I felt like a wizard! 🧙‍♂️ I could create a form, send data to a server, process it, store it in a database, and display it back. The whole cycle was magical. But let me tell you, it wasn\'t always smooth sailing.',
        'Learning backend development was like learning a new language. REST APIs, databases, authentication, security – there was so much to absorb! I spent countless nights debugging why my API wasn\'t working, only to realize I forgot to enable CORS. Classic beginner mistake!',
        'One of my biggest challenges was understanding how everything connects. The frontend talks to the backend, which talks to the database, which talks back... It\'s like a conversation where everyone needs to speak the same language. Learning about HTTP methods, status codes, and JSON was like learning the grammar of web communication.',
        'Database design was another adventure. I remember creating my first database schema and thinking, "This is easy!" Then I tried to query it and realized I had no idea what I was doing. Learning SQL was like learning to ask the right questions to get the right answers.',
        'The most valuable lesson I learned? Don\'t try to learn everything at once. Focus on one thing, master it, then move to the next. Full-stack development is a marathon, not a sprint. Each project teaches you something new, and every bug you fix makes you a better developer.',
        'Today, I love being a full-stack developer because I can see the entire picture. I understand how the user experience connects to the server logic, how data flows through the system, and how to optimize the entire stack. It\'s like being both the architect and the builder of a digital house!'
      ]
    },
    {
      title: 'TypeScript Tips and Tricks for Better Code',
      date: 'January 25, 2024',
      excerpt: 'Discover advanced TypeScript features and patterns that can help you write more maintainable and type-safe code in your projects.',
      category: 'Tips',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      content: [
        'TypeScript is like JavaScript with a safety net and a really smart friend who catches your mistakes before they become problems! 🎯 If you\'re not using TypeScript yet, you\'re missing out on one of the best developer experiences in modern web development.',
        'Let\'s start with type inference – TypeScript is incredibly smart about guessing types. You don\'t always need to explicitly type everything. It\'s like having a friend who knows what you mean even when you don\'t say it explicitly. But when you do need to be explicit, TypeScript gives you that power too.',
        'Union types are one of my favorite features. They\'re like having a variable that can be multiple things. For example, `status: "loading" | "success" | "error"` means your status can only be one of those three values. It\'s like having a strict bouncer at a club who only lets in the right types!',
        'Generics are TypeScript\'s way of creating reusable code that works with different types. Think of them as templates that adapt to whatever type you throw at them. They\'re like a universal adapter that fits any plug – super useful for creating flexible functions and components.',
        'Type guards are your safety inspectors. They help TypeScript understand what type something is at runtime. Using `typeof`, `instanceof`, or custom type guards is like showing ID at a checkpoint – TypeScript can then trust that you know what you\'re working with.',
        'The `as const` assertion is a game-changer for creating truly immutable data. It\'s like freezing an object in time – TypeScript will treat it as a literal type rather than a general type. Perfect for configuration objects and constants!',
        'Utility types like `Partial<T>`, `Pick<T, K>`, and `Omit<T, K>` are like Swiss Army knives for types. They let you create new types based on existing ones. Need a type with all properties optional? Use `Partial`. Need only specific properties? Use `Pick`. It\'s like having a type transformer!',
        'One pro tip: Don\'t fight TypeScript – embrace it! The more you use it, the more it helps you. Start strict, use `any` sparingly (or never if you can help it), and let TypeScript guide you. Your future self will thank you when you\'re refactoring code and TypeScript catches errors before they reach production!'
      ]
    },
    {
      title: 'The Future of Web Development: Trends to Watch',
      date: 'January 5, 2024',
      excerpt: 'An overview of emerging technologies and trends in web development, from AI integration to new frameworks and tools shaping the industry.',
      category: 'Technology',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      content: [
        'The web development landscape is evolving faster than ever, and it\'s an exciting time to be a developer! 🚀 Let\'s take a peek into the crystal ball and explore the trends that are shaping the future of web development.',
        'Artificial Intelligence is no longer science fiction – it\'s here and transforming how we build applications. AI-powered code completion tools are like having a pair programming buddy who never gets tired. They can suggest entire functions, catch bugs, and even write tests. It\'s like having a coding assistant that learns your style!',
        'WebAssembly (WASM) is opening up new possibilities for performance-critical applications. Imagine running C++ or Rust code directly in the browser at near-native speed. It\'s like giving your browser a turbo engine! Games, video editing, and complex calculations that were once impossible in the browser are now becoming reality.',
        'Serverless architecture is changing how we think about backend infrastructure. Instead of managing servers, you write functions that run on-demand. It\'s like having a restaurant where the kitchen only exists when you order food – efficient, scalable, and cost-effective!',
        'Edge computing is bringing computation closer to users. Instead of everything happening on a central server, processing happens at the "edge" of the network. This means faster response times and better user experiences. It\'s like having local branches of a bank instead of one central location.',
        'Progressive Web Apps (PWAs) are blurring the line between web and native apps. They can work offline, send push notifications, and feel like native applications. It\'s like having the best of both worlds – the reach of the web with the experience of native apps.',
        'Component-driven development is becoming the standard. Design systems and component libraries are making it easier to build consistent, maintainable UIs. It\'s like having a box of LEGO blocks where every piece fits perfectly with every other piece.',
        'The rise of low-code and no-code platforms is democratizing web development. While they won\'t replace developers, they\'re opening up web development to more people. It\'s like having automatic transmission in cars – it makes driving accessible to more people, but professional drivers still need manual transmission!',
        'Sustainability in web development is gaining attention. Optimizing for performance isn\'t just about speed – it\'s about reducing energy consumption and carbon footprint. Building efficient applications is like building fuel-efficient cars – better for everyone!',
        'The future is bright, and the best part? We get to shape it! Whether you\'re learning AI integration, experimenting with WebAssembly, or building the next generation of web applications, there\'s never been a better time to be a web developer. Stay curious, keep learning, and enjoy the ride! 🌟'
      ]
    }
  ];

  openPostModal(index: number) {
    this.selectedPostIndex = index;
  }

  closePostModal() {
    this.selectedPostIndex = null;
  }
}
