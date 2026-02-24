# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application built with Vite, using React 19.2.0 and modern JavaScript (ES modules).

## Development Commands

```bash
# Start development server with hot module replacement
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality checks
npm run lint
```

## Architecture

**Build Tool**: Vite 7.3.1 with @vitejs/plugin-react for Fast Refresh using Babel

**Entry Points**:
- `index.html` - HTML entry point (Vite uses this as entry, not a public HTML file)
- `src/main.jsx` - JavaScript entry point that mounts the React app
- `src/App.jsx` - Root React component

**Project Structure**:
- `src/` - Application source code
- `public/` - Static assets served as-is
- `dist/` - Production build output (generated)

**Styling**: CSS files imported directly into components (Vite handles bundling)

**ESLint**: Configured with React-specific rules including react-hooks and react-refresh plugins
