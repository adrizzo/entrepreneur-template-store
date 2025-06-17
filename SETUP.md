# Entrepreneur Marketplace Setup Guide

This is a comprehensive marketplace built with Next.js, Supabase, NextAuth, and Stripe for entrepreneurs to sell their products.

## Features

✅ **User Authentication**
- Email/password registration and login
- Google OAuth integration
- Protected admin routes
- Role-based access control

✅ **Admin Dashboard**
- Product management (CRUD operations)
- Order management
- Site customization (logo, colors, fonts)
- User management
- Analytics dashboard

✅ **Product Management**
- Add, edit, delete products
- Image upload support
- Category management
- Product search and filtering
- Active/inactive product status

✅ **Stripe Integration**
- Secure payment processing
- Order management
- Webhook support

✅ **Responsive Design**
- Mobile-first design
- Modern UI with Tailwind CSS
- Accessible components

## Prerequisites

- Node.js 18+ installed
- A Supabase account
- A Google OAuth app (optional)
- A Stripe account
- Git

## Installation Steps

### 1. Clone and Install Dependencies

```bash
git clone <your-repo>
cd entrepreneur-marketplace
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your URL and anon key
3. Go to SQL Editor and run the setup script:

```sql
-- Copy and paste the contents of supabase/setup.sql
```

4. In Authentication > Settings:
   - Enable email authentication
   - Configure Google OAuth (optional)

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-a-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# Admin Configuration
ADMIN_EMAIL="admin@yourstore.com"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`

### 5. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Set up webhooks:
   - Endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`

### 6. Create Admin User

After setting up Supabase, manually create an admin user:

```sql
INSERT INTO users (email, name, role) 
VALUES ('admin@yourstore.com', 'Admin User', 'ADMIN');
```

### 7. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your marketplace!

## Usage Guide

### Admin Access

1. Sign up with the admin email you configured
2. Go to `/admin` to access the admin dashboard
3. Use the admin panel to:
   - Add products
   - Manage orders
   - Customize site appearance
   - View analytics

### Adding Products

1. Go to Admin Dashboard > Add Product
2. Fill in product details:
   - Name, description, price
   - Category and tags
   - Upload images
   - Set availability status

### Site Customization

1. Go to Admin Dashboard > Site Settings
2. Customize:
   - Site name and description
   - Logo and colors
   - Font family
   - Contact information
   - SEO settings

### Setting Up Payments

1. Configure Stripe in the environment variables
2. Test payments work in development
3. Switch to live keys for production

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- AWS
- DigitalOcean

## Customization

### Adding New Features

The codebase is structured for easy extension:
- `/src/components` - Reusable UI components
- `/src/app` - Pages and API routes
- `/src/lib` - Utility functions and configurations
- `/supabase` - Database schema and migrations

### Styling

- Uses Tailwind CSS for styling
- Theme colors can be customized in admin settings
- Font families can be changed in admin settings

### Database Schema

The app uses these main tables:
- `users` - User accounts and roles
- `products` - Product catalog
- `orders` - Order management
- `order_items` - Order line items
- `site_config` - Site customization settings

## Troubleshooting

### Common Issues

1. **Authentication not working**
   - Check NEXTAUTH_SECRET is set
   - Verify Supabase URL and keys
   - Check Google OAuth configuration

2. **Database errors**
   - Ensure Supabase setup script was run
   - Check Row Level Security policies
   - Verify environment variables

3. **Stripe payments failing**
   - Check Stripe keys are correct
   - Verify webhook endpoint
   - Test with Stripe test cards

### Getting Help

- Check the console for error messages
- Verify all environment variables are set
- Test database connection
- Check Supabase logs

## Security Notes

- Never commit `.env.local` to version control
- Use strong, unique secrets for production
- Enable RLS policies in Supabase
- Regularly update dependencies
- Use HTTPS in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License. 