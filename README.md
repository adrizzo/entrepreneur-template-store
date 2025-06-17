# EntrepreneurMarket

A modern marketplace platform for entrepreneurs built with Next.js, featuring product listings, categories, and user authentication.

## Features

- 🛍️ Product catalog with search and filtering
- 📱 Responsive design for all devices
- 🔐 User authentication with NextAuth.js
- 🏪 Admin dashboard for product management
- 🎨 Modern UI with Tailwind CSS
- 📊 Category management system

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Supabase (configured for mock data)
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── products/          # Product pages
│   └── categories/        # Category pages
├── components/            # Reusable components
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
