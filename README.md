# ae - E-Learning Platform

A modern web-based e-learning platform connecting teachers and students.

## Project Structure

\\\
ae-platform/
 public/                    # Static assets
    assets/
       images/           # Image assets
       fonts/            # Font files
    index.html            # Main HTML file

 src/
    components/           # Reusable components
       common/          # Shared components
       auth/            # Auth components
       dashboard/       # Dashboard components
       courses/         # Course components
       enrollment/      # Enrollment components
       reviews/         # Review components
       learning/        # Learning components
       payment/         # Payment components
   
    pages/               # Page components
       Auth/           # Auth pages
       Dashboard/      # Dashboard pages
       Course/         # Course pages
       Teacher/        # Teacher pages
   
    hooks/              # Custom React hooks
    context/            # React Context providers
    services/           # API services
    utils/              # Utility functions
       constants/      # Constants
       helpers/        # Helper functions
       validators/     # Validation functions
   
    store/              # State management
       slices/         # Redux slices
   
    types/              # Type definitions
    routes/             # Route components
    assets/             # App assets
    config/             # Configuration files

 package.json            # Dependencies
 tailwind.config.js      # Tailwind config
 postcss.config.js       # PostCSS config
 vite.config.js          # Vite config
 README.md               # Documentation
\\\

## Features Implemented

###  Core Features
1. **Responsive Layout** - Header, Footer, MainLayout
2. **Home Page** - Hero section, features, course cards
3. **Course Components** - CourseCard with ratings, pricing
4. **Authentication Context** - User auth management
5. **Protected Routes** - Role-based routing
6. **Tailwind CSS** - Fully configured with custom styles

###  Folder Structure
- Organized by feature/module
- Clean separation of concerns
- Reusable components
- Scalable architecture

## Getting Started

\\\ash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\\\

## Available Scripts

- \
pm run dev\ - Start development server (http://localhost:5173)
- \
pm run build\ - Build for production
- \
pm run preview\ - Preview production build
- \
pm run lint\ - Run ESLint

## Technology Stack

- **React 18** - Frontend library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Icons** - Icon library
- **Axios** - HTTP client

## Next Steps

1. **Implement Authentication** - Complete login/register pages
2. **Build Dashboard Pages** - Teacher/Student/Admin dashboards
3. **Course Management** - Course creation, editing, deletion
4. **Payment Integration** - Stripe/PayPal integration
5. **Backend API** - Connect to Node.js/Express backend
6. **Database** - MongoDB/PostgreSQL integration

## Development Notes

- All components are responsive
- Uses Context API for state management
- Modular folder structure for scalability
- Follows React best practices
- Includes custom Tailwind utilities

## License

MIT License - Feel free to use for educational purposes.
