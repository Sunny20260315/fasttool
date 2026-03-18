---
name: "project-guidelines"
description: "Provides TypeScript conventions and UI design guidelines for the project. Invoke when developing new features, reviewing code, or ensuring design consistency."
---

# Project Guidelines

This skill provides TypeScript conventions and UI design guidelines for the project to ensure code quality and design consistency.

## TypeScript Conventions

### 1. Type System

#### 1.1 Type Definitions
- Use `type` for type aliases
- Use `interface` for object structures
- Add type annotations for all function parameters and return values
- Use union and intersection types for better type safety

#### 1.2 Naming Conventions
- Type names: PascalCase
- Interface names: PascalCase
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Functions: camelCase
- Components: PascalCase

#### 1.3 Code Style
- 2 spaces indentation
- Single quotes
- Semicolons
- Allman style braces
- Space after colons in type annotations

### 2. Type Safety

#### 2.1 Strict Mode
- Enable `strict: true`
- Enable `noImplicitAny: true`
- Enable `strictNullChecks: true`

#### 2.2 Null Handling
- Use optional chaining `?.`
- Use nullish coalescing `??`
- Avoid `null`, prefer `undefined`
- Add type guards for potentially undefined values

### 3. Best Practices

#### 3.1 Performance
- Avoid `any` type
- Use `unknown` type when appropriate
- Avoid excessive type assertions

#### 3.2 Maintainability
- Clear and concise type definitions
- Comment type purposes and constraints
- Keep type definitions consistent with actual usage

## UI Design Guidelines

### 1. Design System

#### 1.1 Color System
- Primary: `#5e69f1` (Indigo 500)
- Secondary: `#ec4899` (Pink 500)
- Success: `#10b981` (Emerald 500)
- Warning: `#f59e0b` (Amber 500)
- Error: `#ef4444` (Red 500)
- Background: `#f8f9fc`
- Text: `#111827`

#### 1.2 Spacing System
- 0.25rem (4px): `space-1`
- 0.5rem (8px): `space-2`
- 1rem (16px): `space-4`
- 1.5rem (24px): `space-6`
- 2rem (32px): `space-8`

#### 1.3 Typography
- Headings: `font-semibold` or `font-bold`
- Body: `font-normal`
- Small text: `text-sm`
- Tiny text: `text-xs`

### 2. Component Guidelines

#### 2.1 Buttons
- Primary: `bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-lg shadow-md`
- Secondary: `border border-gray-200 bg-white text-gray-800 px-6 py-2 rounded-lg shadow-sm`

#### 2.2 Cards
- Base: `rounded-2xl border border-gray-200 bg-white p-6 shadow-soft`

#### 2.3 Forms
- Inputs: `w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`

### 3. Layout Guidelines

#### 3.1 Containers
- Max width: `max-w-7xl`
- Padding: `px-6` (mobile), `px-10` (desktop)
- Centering: `mx-auto`

#### 3.2 Responsive Breakpoints
- Mobile: `sm` (640px)
- Tablet: `md` (768px)
- Desktop: `lg` (1024px)
- Large: `xl` (1280px)

### 4. Interaction Guidelines

#### 4.1 Hover Effects
- Buttons: `hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300`
- Cards: `hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300`

#### 4.2 Transitions
- Fade: `transition-opacity duration-300`
- Slide: `transition-transform duration-300`
- Scale: `transition-transform duration-300`

## Usage Examples

### TypeScript Example

```typescript
// Type definition
type UserId = string | number;

interface User {
  id: UserId;
  name: string;
  email: string;
  age?: number;
}

// Function with type annotations
const processUser = (user: User): boolean => {
  // Process user
  return true;
};
```

### UI Component Example

```tsx
import { Card, CardContent } from "@/components/ui/card";

function ExampleCard() {
  return (
    <Card className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Card Title</h3>
        <p className="text-gray-600 mb-4">Card content goes here.</p>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
          Action
        </button>
      </CardContent>
    </Card>
  );
}
```

## When to Use

Invoke this skill when:
- Developing new features
- Reviewing code
- Ensuring design consistency
- Onboarding new team members
- Refactoring existing code
- Creating new components
