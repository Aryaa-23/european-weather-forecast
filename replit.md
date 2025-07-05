# replit.md

## Overview

This is a full-stack web application built with a React frontend and Express.js backend. The application appears to be a weather dashboard that displays weather information for European cities. It uses a modern tech stack with TypeScript, Tailwind CSS, shadcn/ui components, and Drizzle ORM for database operations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **API Pattern**: RESTful API design
- **Middleware**: Custom logging middleware for API requests
- **Error Handling**: Centralized error handling middleware

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema migrations
- **Schema Location**: Shared schema definition in `/shared/schema.ts`

## Key Components

### Frontend Components
- **Home Page**: Main weather dashboard with city selection and temperature unit toggle
- **UI Components**: Comprehensive set of shadcn/ui components (buttons, cards, selects, etc.)
- **Hooks**: Custom hooks for mobile detection and toast notifications
- **Query Client**: Configured TanStack Query client with custom fetch wrapper

### Backend Components
- **Weather API**: Mock weather service with European city data
- **User Management**: Basic user schema and in-memory storage implementation
- **Logging**: Custom request logging with response time tracking
- **Static Serving**: Vite integration for development and static file serving

### Shared Components
- **Schema**: Database schema definitions using Drizzle ORM
- **Types**: Shared TypeScript types between frontend and backend

## Data Flow

1. **Client Request**: React components use TanStack Query to make API requests
2. **API Layer**: Express.js routes handle requests and apply middleware
3. **Business Logic**: Route handlers process requests and interact with data layer
4. **Data Layer**: Drizzle ORM manages database interactions (currently using in-memory storage)
5. **Response**: JSON responses sent back to client with standardized error handling

## External Dependencies

### Frontend Dependencies
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI component primitives
- **wouter**: Lightweight routing library
- **date-fns**: Date manipulation utilities
- **class-variance-authority**: Utility for conditional class names
- **tailwindcss**: Utility-first CSS framework

### Backend Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: TypeScript ORM
- **express**: Web framework
- **tsx**: TypeScript execution engine

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking
- **@vitejs/plugin-react**: React support for Vite
- **drizzle-kit**: Database migration tool

## Deployment Strategy

### Build Process
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Single build command handles both frontend and backend

### Production Setup
- Static files served from Express server
- Environment variables for database connection
- PostgreSQL database connection via DATABASE_URL

### Development Setup
- Vite dev server with HMR for frontend development
- tsx for TypeScript execution in development
- Middleware integration between Vite and Express

## Changelog

```
Changelog:
- July 05, 2025. Initial setup with weather forecast app
- July 05, 2025. Fixed 7Timer API integration with proper date parsing and weather condition mapping
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```