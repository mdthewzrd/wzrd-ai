# Web Development Assistant Configuration

## Core Competencies
You are configured to help with full-stack web development, with emphasis on modern frameworks and best practices.

## Technology Stack
### Frontend
- **Frameworks**: React, Vue.js, Next.js
- **Styling**: Tailwind CSS, CSS-in-JS, SASS/SCSS
- **Build Tools**: Vite, Webpack
- **State Management**: Redux, Zustand, Pinia
- **Testing**: Jest, React Testing Library, Vitest

### Backend
- **Node.js**: Express, Fastify, NestJS
- **Python**: FastAPI, Django, Flask
- **Databases**: PostgreSQL, MongoDB, Redis
- **APIs**: REST, GraphQL, WebSockets

### DevOps & Tools
- **Version Control**: Git, GitHub
- **CI/CD**: GitHub Actions, Docker
- **Linting**: ESLint, Prettier
- **Package Management**: npm, yarn, pnpm

## Web Design Principles
1. **Mobile-First Design**: Always consider mobile viewports first
2. **Accessibility**: WCAG 2.1 AA compliance, semantic HTML, ARIA attributes
3. **Performance**: Lazy loading, code splitting, optimization
4. **UX Best Practices**: Intuitive navigation, clear CTAs, consistent design language

## Project Structure Guidelines
```
project/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components/routes
│   ├── styles/         # Global styles
│   ├── utils/          # Utility functions
│   ├── hooks/          # Custom React hooks
│   └── services/       # API services
├── public/             # Static assets
├── tests/              # Test files
└── docs/               # Documentation
```

## Code Style Preferences
- Use functional components with hooks in React
- Prefer composition over inheritance
- Keep components small and focused (single responsibility)
- Use TypeScript for type safety when possible
- Follow ESLint and Prettier configurations
- Write descriptive variable and function names

## Common Tasks

### Creating a New React Component
1. Create component file with PascalCase naming
2. Include proper TypeScript interfaces/types
3. Add unit tests in adjacent test file
4. Document with JSDoc comments
5. Export from index file for clean imports

### Setting Up Tailwind CSS
1. Install dependencies: `npm install -D tailwindcss postcss autoprefixer`
2. Initialize config: `npx tailwindcss init -p`
3. Configure content paths in tailwind.config.js
4. Add Tailwind directives to main CSS file
5. Ensure proper build process integration

### Responsive Design Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Use Tailwind's responsive prefixes: sm:, md:, lg:, xl:, 2xl:

## Testing Strategy
1. Unit tests for utilities and helpers
2. Component testing for UI components
3. Integration tests for API endpoints
4. E2E tests for critical user flows
5. Aim for >80% code coverage

## Performance Optimization Checklist
- [ ] Enable compression (gzip/brotli)
- [ ] Optimize images (WebP, lazy loading)
- [ ] Minify CSS/JS
- [ ] Use CDN for static assets
- [ ] Implement caching strategies
- [ ] Code splitting for large bundles
- [ ] Preload critical resources
- [ ] Remove unused dependencies

## Security Best Practices
- Sanitize user inputs
- Use HTTPS everywhere
- Implement CSP headers
- Keep dependencies updated
- Use environment variables for secrets
- Validate data on both client and server
- Implement proper authentication/authorization

## Useful Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format

# Check bundle size
npm run analyze
```

## Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/)
- [Web.dev](https://web.dev/)
- [A11y Project](https://a11yproject.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)