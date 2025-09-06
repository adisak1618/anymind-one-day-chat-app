# 💬 Chat Application - React + TypeScript + GraphQL

A modern real-time chat application built with React, TypeScript, and GraphQL. Features user selection, channel switching, message persistence, error handling, and comprehensive testing.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation & Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd anymind

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:5173`

## 📋 Available Scripts

### Development

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Code Quality

```bash
# Run ESLint for code linting
pnpm lint

# Type checking without emitting files
pnpm type-check
```

### GraphQL Code Generation

```bash
# Generate TypeScript types and hooks from GraphQL schema
pnpm codegen
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode during development
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage

# Run only unit tests (co-located with components)
pnpm test:unit

# Run only integration tests
pnpm test:integration

# Run tests for CI environment (no watch, with coverage)
pnpm test:ci
```

## 🛠️ Tech Stack

### Core Technologies

- **React 19** - Modern React with latest features
- **TypeScript 5.8** - Type-safe JavaScript with strict configuration
- **Vite 7** - Fast build tool with HMR (Hot Module Replacement)

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **clsx + tailwind-merge** - Conditional classes and conflict resolution
- **Custom UI Components** - Reusable design system components

### GraphQL & API

- **Apollo Client 4** - GraphQL client with caching and state management
- **GraphQL Code Generator** - Automatic TypeScript type generation
- **GraphQL Endpoint**: `https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql`

### State Management

- **React Context** - Global state management
- **Custom Hooks** - Business logic encapsulation (`useChatState`, `useLocalStorage`)
- **localStorage** - Persistent state across browser sessions

### Testing

- **Jest 30** - Testing framework
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM environment for testing
- **@apollo/client/testing** - GraphQL mocking utilities
- **89% test coverage** - Comprehensive unit and integration tests

### Development Tools

- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite TypeScript Paths** - Path alias support (`@/` imports)

## 🏗️ Architecture

### Folder Structure

```
src/
├── pages/                 # Page-specific components
│   └── chat/
│       ├── page.tsx       # Main chat page layout
│       └── _components/   # Page-specific components
├── modules/               # Feature-based modules
│   └── chat/
│       ├── components/    # Chat-specific components
│       ├── hooks/         # Business logic hooks
│       ├── context/       # React Context providers
│       └── gql/           # GraphQL operations
├── ui/                    # Generic UI components
├── lib/                   # Utility functions and hooks
└── gql/                   # Generated GraphQL types
```

### Key Features

- **Real-time messaging** with optimistic updates
- **User & channel selection** with persistence
- **Advanced error handling** with retry/undo functionality
- **Message drafts** that persist per channel
- **Cross-session state** maintenance with localStorage
- **Responsive design** with modern chat UX patterns

## 🧪 Testing Strategy

### Test Types

- **Unit Tests** - Individual components and hooks
- **Integration Tests** - Full user workflows and API interactions
- **Mock GraphQL** - Success and failure scenarios

### Test Coverage

- **89%** overall coverage across statements, branches, functions, and lines
- **Co-located tests** with components for better organization
- **CI/CD integration** with GitHub Actions

## 🔧 Development

### GraphQL Schema Updates

When the GraphQL schema changes:

```bash
pnpm codegen
```

This regenerates TypeScript types and Apollo hooks.

### Adding New Features

1. Create components in appropriate `modules/` or `ui/` folders
2. Add corresponding unit tests co-located with components
3. Update integration tests for user workflows
4. Run `pnpm test:coverage` to ensure coverage standards

## 🚢 Production Build

```bash
# Build for production
pnpm build

# Files will be generated in dist/ folder
# Serve with any static file server
```

## 📝 Environment

- **GraphQL Endpoint**: Pre-configured to AnyMind test backend
- **No environment variables required** for basic functionality
- **localStorage** used for client-side persistence

---

Built with ❤️ using modern React practices and comprehensive testing strategies.

Adisak Chaiyakul
email: adisakchaiyakul@gmail.com
