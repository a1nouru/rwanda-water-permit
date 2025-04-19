# WaterPermit Application

A modern web application for managing water permit applications in Rwanda. This application allows users to:

- Create an account (personal or company)
- Apply for various types of water permits
- Track application status
- View application history and details

## Features

- **User Authentication**: Secure login and registration system
- **Dashboard**: View and manage permit applications
- **Application Tracking**: Real-time status updates for applications
- **Document Upload**: Submit required documents with your application
- **Location Tracking**: Capture geographic coordinates for water sources

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/waterpermit.git
cd waterpermit
```

2. Install dependencies for the frontend
```bash
cd frontend
npm install
```

### Running the Application

#### Development Mode

To run the frontend in development mode:

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
waterpermit/
│
├── frontend/                # React.js frontend application
│   ├── app/                 # Next.js pages and routes
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions and hooks
│   └── public/              # Static assets
```

## Technologies Used

### Frontend
- **React.js** - JavaScript library for building user interfaces
- **Next.js** - React framework for server-side rendering and routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Component library for the UI
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **Zod** - Form validation

## User Flows

1. **Registration/Login**
   - Users can register as a company or individual
   - Enter personal or company details
   - Verify account with PIN

2. **Dashboard**
   - View summary of applications
   - See application status counts
   - Access detailed information about each application

3. **Submit New Application**
   - Fill out application details
   - Provide location information
   - Upload required documents
   - Submit for review

4. **Track Applications**
   - View application statuses
   - Check detailed application information
   - Download approval documents when available
   - Reapply if application was rejected

## Building for Production

```bash
cd ~/go/src/waterpermit/frontend
npm run build
# or
yarn build
```

## Deployment

This project is configured for easy deployment to Google Cloud Platform:

1. Install Google Cloud SDK
2. Authenticate with Google Cloud:
   ```bash
   gcloud auth login
   ```
3. Deploy to Google Cloud Run:
   ```bash
   gcloud run deploy waterpermit --source .
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Design inspiration from modern SaaS applications
- Shadcn UI for the beautiful component library
- Next.js team for the amazing framework 