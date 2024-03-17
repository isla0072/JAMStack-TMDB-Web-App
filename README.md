# JAMStack TMDB Web App

## Overview
This JAMStack Web App leverages The Movie Database (TMDB) API to provide a seamless movie and TV show discovery experience. Designed with a mobile-first approach, it offers responsive, user-friendly interfaces that adapt to various screen sizes, ensuring a smooth navigation experience across devices.

## Features
- **Unified Search Interface**: Users can search for movies or TV shows from a single screen, with search results dynamically updated.
- **Detailed Information Cards**: Search results are displayed as cards, showing key details and images for each movie or TV show.
- **Cast Discovery**: Clicking on a movie or TV show card navigates the user to a detailed cast listing, presented in a grid format.
- **Responsive Design**: The app's layout adjusts to the screen size, providing an optimal viewing experience on both mobile and desktop devices.
- **Offline Support**: Utilizes service workers to cache essential assets and data, enabling functionality even when offline.

## Technical Highlights
- **Mobile-First Design**: Emphasizes responsiveness and usability on mobile devices, scaling up to accommodate larger screens.
- **Content-Security-Policy**: Implements strict CSP rules to enhance security by restricting resource loading to trusted sources.
- **History API Integration**: Leverages the History API for smooth navigation and maintaining session history, enhancing the user experience.
- **Error Handling**: Utilizes a custom `NetworkError` class to gracefully handle fetch errors and inform users of issues.

## Credits
Developed as part of the final project for the Cross-Platform Application Development course.
