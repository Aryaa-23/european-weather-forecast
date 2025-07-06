# Contributing to European Weather Forecast

Thank you for your interest in contributing to the European Weather Forecast project! We welcome contributions from developers of all skill levels.

## How to Contribute

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/european-weather-forecast.git
   cd european-weather-forecast
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

### Making Changes

1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```

2. **Make your changes** following our coding standards (see below)

3. **Test your changes** thoroughly:
   - Ensure the app runs without errors
   - Test on different screen sizes
   - Verify weather data loads correctly
   - Check that temperature unit switching works

4. **Commit your changes** with descriptive messages:
   ```bash
   git add .
   git commit -m "Add weather alerts feature"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Submit a Pull Request** on GitHub

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type unless absolutely necessary
- Use meaningful variable and function names

### React Components
- Use functional components with hooks
- Follow the existing component structure
- Use proper prop types and interfaces
- Keep components focused on a single responsibility

### Styling
- Use Tailwind CSS classes for styling
- Follow the existing design system
- Ensure responsive design (mobile-first approach)
- Use semantic HTML elements

### Code Organization
- Place reusable components in `client/src/components/`
- Keep page components in `client/src/pages/`
- Use the existing folder structure
- Import paths should use the configured aliases (`@/`, `@shared/`)

## What We're Looking For

### Priority Features
- Additional European cities
- Weather alerts and notifications
- Historical weather data visualization
- Performance optimizations
- Accessibility improvements
- Mobile app version (PWA)

### Bug Fixes
- UI/UX improvements
- API error handling
- Cross-browser compatibility issues
- Performance bottlenecks

### Documentation
- Code comments for complex logic
- README improvements
- Setup guides for different platforms
- API documentation

## Development Guidelines

### Testing
- Test your changes on multiple browsers
- Verify mobile responsiveness
- Check that all cities load weather data correctly
- Test temperature unit conversions

### Performance
- Optimize images and assets
- Minimize bundle size
- Ensure fast loading times
- Use proper caching strategies

### Accessibility
- Use semantic HTML
- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

## Pull Request Process

1. **Ensure your PR description** clearly describes the problem and solution
2. **Include screenshots** for UI changes
3. **Reference any related issues** using GitHub keywords (e.g., "Fixes #123")
4. **Keep PRs focused** - one feature or fix per PR
5. **Update documentation** if needed

### PR Title Format
- `feat: add weather alerts feature`
- `fix: resolve temperature conversion bug`
- `docs: update installation guide`
- `style: improve mobile layout`

## Code Review Process

- All submissions require review before merging
- Reviewers will check for:
  - Code quality and standards
  - Functionality and testing
  - Documentation updates
  - Design consistency

## Getting Help

- **Questions about the codebase?** Open a discussion on GitHub
- **Found a bug?** Open an issue with detailed reproduction steps
- **Want to propose a feature?** Open an issue for discussion first

## Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers get started
- Share knowledge and best practices

## Development Environment

### Recommended Tools
- **Editor**: VSCode with TypeScript and React extensions
- **Browser**: Chrome/Firefox with developer tools
- **Testing**: Built-in browser dev tools
- **Version Control**: Git with meaningful commit messages

### Environment Setup
```bash
# Install Node.js 18+
node --version  # Should be 18+

# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run check

# Build for production
npm run build
```

Thank you for contributing to European Weather Forecast! 🌤️