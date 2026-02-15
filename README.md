# Technical Intervention Manager

A comprehensive web application for managing technical interventions, designed to streamline workflow between administrators and technicians.

## Overview

The Technical Intervention Manager is a full-featured dashboard system that allows administrators to create and assign technical interventions while enabling technicians to view, track, and update their assigned tasks in real-time.

## Features

### Administrator Features
- Create and manage technical interventions
- Assign interventions to specific technicians
- Set priority levels (High, Medium, Low)
- Track intervention status through complete lifecycle
- View comprehensive analytics and statistics
- Real-time dashboard with progress monitoring

### Technician Features
- Personal dashboard with assigned interventions
- Update intervention status (To Do → In Progress → Done)
- View intervention details and requirements
- Track personal performance metrics
- Mobile-responsive interface

### System Features
- Role-based access control
- Real-time status updates
- Responsive design for all devices
- Modern dark theme UI
- Smooth animations and transitions
- Progress tracking and analytics

## Project Structure

```
proj2/
├── index.html          # Landing page with marketing content
├── app.html            # Main application dashboard
├── styles.css          # Complete stylesheet for both pages
├── script.js           # Landing page JavaScript
├── app.js              # Dashboard application logic
└── README.md           # This file
```

## Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Setup
1. Clone or download the project files
2. Serve the files using a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
3. Open `http://localhost:8000` in your browser

## Usage

### Getting Started
1. Open the landing page (`index.html`)
2. Click "Get Started" to proceed to login
3. Select your role (Administrator or Technician)
4. Enter credentials to access the dashboard

### Administrator Workflow
1. **Create Intervention**: Fill out the intervention form with title, description, priority, and assign to technician
2. **Monitor Progress**: View all interventions in the dashboard with real-time status updates
3. **Track Analytics**: Monitor team performance and intervention statistics
4. **Manage Tasks**: Update intervention details and reassign as needed

### Technician Workflow
1. **View Dashboard**: See assigned interventions with current status
2. **Update Status**: Change intervention status as work progresses
3. **Track Progress**: Monitor personal completion rates and performance
4. **View Details**: Access full intervention information and requirements

## Technical Details

### Frontend Technologies
- **HTML5**: Semantic markup and modern structure
- **CSS3**: Responsive design with CSS Grid and Flexbox
- **JavaScript ES6+**: Modern JavaScript with DOM manipulation
- **CSS Variables**: Custom properties for theming
- **Responsive Design**: Mobile-first approach with breakpoints

### Design System
- **Color Scheme**: Dark theme with purple/blue gradients
- **Typography**: Inter font family for optimal readability
- **Layout**: Grid-based responsive layouts
- **Animations**: Smooth transitions and micro-interactions
- **Components**: Reusable card-based UI elements

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## File Descriptions

### HTML Files
- `index.html`: Marketing landing page with feature showcase and login
- `app.html`: Main application dashboard with role-based functionality

### CSS Files
- `styles.css`: Complete stylesheet containing:
  - CSS custom properties (variables)
  - Landing page styles
  - Dashboard application styles
  - Responsive design rules
  - Animation definitions

### JavaScript Files
- `script.js`: Landing page interactions and navigation
- `app.js`: Dashboard application logic including:
  - Role management
  - Intervention CRUD operations
  - Status updates
  - Data filtering
  - UI state management

## Responsive Design

The application is fully responsive with optimized layouts for:
- **Desktop** (1024px+): Full sidebar with multi-column layouts
- **Tablet** (768px-1024px): Adaptive sidebar and single-column content
- **Mobile** (<768px): Hidden sidebar with slide-out navigation


### Adding New Features
1. Add HTML structure to appropriate files
2. Style new components in `styles.css`
3. Implement functionality in relevant JavaScript file
4. Test responsive behavior across devices

## Deployment

### Static Hosting
The application can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- AWS S3

### Build Process
No build process required - the application uses plain HTML, CSS, and JavaScript files that can be deployed directly.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across devices
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions:
- Create an issue in the repository
- Review the documentation
- Check browser console for any errors

## Future Enhancements

Planned features for future versions:
- User authentication system
- Database integration
- Real-time notifications
- File attachment support
- Advanced reporting
- API integration
- Mobile application
- Team collaboration features
- Time tracking
- Automated workflows
