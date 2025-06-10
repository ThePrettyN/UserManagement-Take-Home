# User Management Frontend

React app for the user management system.

## Quick Start

```bash
npm install
npm start
```

Runs on http://localhost:3000

## What's included

- User list with search
- Add/edit users in a modal
- Auto-saves location data from zip codes
- Responsive design with Tailwind

## Environment Setup

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:8080
```

## Dependencies

- React 18 + TypeScript
- Tailwind CSS for styling
- Axios for API calls

Make sure the backend is running first!

## Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Mobile-First**: Fully responsive design that works on all devices
- **TypeScript**: Full type safety and better developer experience
- **Real-time Updates**: Live data synchronization with backend
- **CRUD Operations**: Create, read, update, and delete users
- **Location Display**: Shows coordinates and timezone information
- **Interactive Forms**: Modal forms with validation and loading states
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

## Tech Stack

- **React 18** - Latest React with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Router** - Navigation (ready for expansion)

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend server running on port 8080

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create environment file:
   ```bash
   cp env.example .env
   ```
   
   Or manually create `.env` file with:
   ```env
   REACT_APP_API_URL=http://localhost:8080
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open your browser to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── UserList.tsx         # User listing component
│   └── UserForm.tsx         # User create/edit form
├── services/
│   └── api.ts               # API service layer
├── types/
│   └── User.ts              # TypeScript type definitions
├── App.tsx                  # Main application component
├── index.tsx                # React entry point
└── index.css                # Tailwind CSS imports and custom components
```

## Tailwind CSS Features

### Custom Theme
- **Custom Colors**: Primary, success, and danger color palettes
- **Custom Animations**: Fade-in, slide-up, and bounce-subtle animations
- **Component Classes**: Pre-built button, card, and input styles

### Utility Classes Used
- **Layout**: Flexbox and Grid utilities
- **Spacing**: Consistent padding and margin scales
- **Typography**: Font weights, sizes, and colors
- **Interactions**: Hover effects and transitions
- **Responsive**: Mobile-first responsive design

### Component Classes
```css
.btn - Base button styles
.btn-primary - Primary button
.btn-success - Success button
.btn-danger - Danger button
.btn-secondary - Secondary button
.card - Card component with hover effects
.input - Form input styling
```

## Features

### User Management
- **Create User**: Add new users with name and zip code
- **View Users**: Display all users in a responsive card grid
- **Edit User**: Update user information with live location updates
- **Delete User**: Remove users with confirmation dialog

### UI/UX Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Loading States**: Visual feedback during API operations
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client-side validation with helpful hints
- **Interactive Elements**: Hover effects and smooth animations
- **Gradient Backgrounds**: Beautiful gradient overlays
- **Glass Morphism**: Modern backdrop blur effects

### Data Display
- **Location Info**: Shows zip code, coordinates, and timezone
- **Timestamps**: Creation and last update times
- **Auto-refresh**: Manual refresh capability
- **Real-time Sync**: Updates reflect immediately

## Customizing Tailwind

To customize the design, edit the `tailwind.config.js` file:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { /* custom primary colors */ },
        success: { /* custom success colors */ },
        danger: { /* custom danger colors */ }
      },
      animation: {
        'custom-animation': 'keyframeName duration ease'
      }
    }
  }
}
```

## API Integration

The frontend communicates with the backend via RESTful APIs:

- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch single user
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. The `build` folder contains the optimized production build with purged CSS

3. Deploy to your preferred hosting service (Netlify, Vercel, etc.)

## Troubleshooting

### Dev Server Issues
If you encounter dev server errors, make sure:
1. You have the correct Node.js version (16+)
2. Your `.env` file is properly configured
3. The backend server is running on port 8080
4. Try clearing your `node_modules` and reinstalling:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Follow the existing code structure
2. Use TypeScript types for all props and state
3. Use Tailwind utility classes instead of custom CSS
4. Follow the existing component class patterns
5. Test on multiple screen sizes
6. Ensure proper error handling 