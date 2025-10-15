# Chop and Chicks Admin Panel

A modern, feature-rich admin panel built with Next.js 15 and Supabase for managing the Chop and Chicks restaurant platform. This dashboard provides comprehensive tools for managing vendors, orders, users, and customer queries.

## 🚀 Features

### Dashboard Overview
- **Real-time Statistics**: Track total users, vendors, orders, and active deliveries
- **Order Analytics**: Interactive charts displaying order statistics and trends
- **Daily Metrics**: Monitor daily average orders and active vendors
- **Visual Insights**: Rich data visualization using Recharts

### Core Modules
- **Vendor Management**: Complete CRUD operations for vendor profiles and details
- **Order Management**: Track and manage all customer orders
- **User Management**: Monitor platform users and their activities
- **Query Management**: Handle customer queries and support requests

### Authentication & Security
- **Supabase Authentication**: Secure login system with session management
- **Protected Routes**: Middleware-based route protection
- **Server-Side Rendering**: Secure data fetching with SSR

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.3.3**: React framework with App Router
- **React 19**: Latest React with server components
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling

### Backend & Database
- **Supabase**: Backend-as-a-Service for authentication and database
- **@supabase/ssr**: Server-side rendering support
- **@supabase/supabase-js**: JavaScript client library

### UI Components
- **shadcn/ui**: High-quality, accessible component library
- **Radix UI**: Unstyled, accessible components
- **Lucide React**: Beautiful icon library
- **Recharts**: Composable charting library
- **next-themes**: Dark/light theme support

### Form Handling & Validation
- **React Hook Form**: Performant form management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Form validation resolvers

### Additional Libraries
- **date-fns**: Modern date utility library
- **sonner**: Toast notifications
- **cmdk**: Command palette component
- **use-debounce**: Debounce hook for optimized inputs

## 📋 Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun
- Supabase account and project

## ⚙️ Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚦 Getting Started

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

The app uses Turbopack for faster development builds.

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── (dashboard)/         # Dashboard layout group
│   │   ├── page.tsx         # Main dashboard page
│   │   ├── vendor-management/
│   │   ├── order-management/
│   │   └── queries/
│   ├── login/               # Authentication pages
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── vendor-management/   # Vendor-specific components
│   ├── dashboard-header.tsx
│   ├── dashboard-sidebar.tsx
│   └── login-form.tsx
├── context/                 # React context providers
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
│   ├── supabase/           # Supabase client setup
│   └── utils.ts            # Helper functions
├── common-data/            # Shared data and constants
│   └── menu-items.ts       # Navigation menu items
├── middleware.ts           # Next.js middleware
└── public/                 # Static assets
```

## 🔑 Key Features Breakdown

### Authentication Flow
- Users are redirected to `/login` if not authenticated
- Session management handled by Supabase SSR
- Protected routes via middleware
- Automatic token refresh

### Dashboard Components
- **Dashboard Header**: Navigation and user profile
- **Dashboard Sidebar**: Main navigation menu with icons
- **Order Chart**: Interactive statistics visualization
- **Stat Cards**: Real-time metric displays

### Vendor Management
- List view with pagination and search
- Detailed vendor profiles
- CRUD operations
- Vendor context for state management

## 🎨 UI Components

The project uses shadcn/ui components including:
- Accordion, Alert Dialog, Avatar, Badge
- Button, Card, Carousel, Chart
- Command, Dialog, Dropdown Menu
- Form, Input, Label, Select
- Table, Tabs, Toast (Sonner)
- And many more...

## 🔧 Development Tools

- **ESLint**: Code linting with Next.js config
- **PostCSS**: CSS processing
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Static type checking

## 📦 Dependencies Highlights

### Production
- `next`: 15.3.3
- `react`: 19.0.0
- `@supabase/supabase-js`: 2.50.0
- `recharts`: 2.15.3
- `zod`: 3.25.67

### Development
- `typescript`: 5.x
- `tailwindcss`: 4.x
- `eslint`: 9.x

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📚 Learn More

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Next.js Learning
- [Next.js Tutorial](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

## 📄 License

Private and proprietary. All rights reserved.

## 🤝 Contributing

This is a private project. For authorized team members, please follow the established development workflow and coding standards.
