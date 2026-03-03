# Windows Desktop Themed Portfolio

A portfolio website built with Angular that mimics a Windows OS desktop interface. Navigate through different sections using desktop icons or the Start menu.

## Features

- 🪟 Windows OS desktop theme
- 🖱️ Interactive desktop icons
- 📋 Start menu navigation
- 📊 Taskbar with open windows
- 🎨 Built with Tailwind CSS
- 📱 Responsive design

## Sections

- **Home** - Welcome page and overview
- **Projects** - Portfolio projects showcase
- **Experience** - Work experience timeline
- **Education** - Academic background
- **Contact** - Contact form and information
- **Blog** - Blog posts and articles
- **Games** - Interactive games (Tic Tac Toe, etc.)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200`

### Building for Production

To build a static website for hosting:

```bash
npm run build
```

The built files will be in the `dist/portfolio` directory, ready for deployment to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

## Technologies Used

- Angular 17
- Tailwind CSS
- TypeScript
- RxJS

## Customization

- Update content in component files (`src/app/sections/`)
- Modify desktop icons in `src/app/desktop/desktop.component.ts`
- Customize colors in `tailwind.config.js`
- Add new sections by creating components and adding routes

## License

MIT
