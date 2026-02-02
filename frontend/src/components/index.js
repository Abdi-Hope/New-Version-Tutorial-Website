// src/components/index.js
// Export all components
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as MainLayout } from './MainLayout';
export { default as CourseCard } from './CourseCard';
export { default as ThemeToggle } from './ThemeToggle';
export { default as TimerDisplay } from './TimerDisplay';

// Export from subfolders
export * from './common';
export * from './courses';
export * from './auth';
export * from './dashboard';
export * from './enrollment';
export * from './learning';
export * from './payment';
export * from './reviews';