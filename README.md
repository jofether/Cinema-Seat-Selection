# Cinema Seat Selection

A React Vite application showcasing a broken grid layout for cinema seat selection. This project demonstrates UI patterns for handling grid structures with intentional whitespace (aisles) and different seat states.

## Features

- Interactive seat selection with visual feedback
- Three seat states: Available, Selected, and Occupied
- Responsive design with Tailwind CSS
- Real-time ticket counter and pricing
- Aisle gaps creating a broken grid structure
- Screen visualization at the top

## Project Structure

```
src/
├── App.jsx        # Main application component with seat selection logic
├── main.jsx       # React entry point
└── index.css      # Tailwind CSS imports
```

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:

```bash
npm run build
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformation

## Design Rationale

This layout relies on a **Broken Grid** structure. Unlike a standard table, a seat map has specific gaps (aisles) and categorizes items by state (Available/Sold). This trains models to recognize intentional whitespace within a grid structure, making it valuable for layout recognition and analysis tasks.

## Future Enhancements

- Remove the aisle gap condition (currently at column 3) for a complete grid
- Add seat categories (VIP, Regular, etc.)
- Integrate with backend API
- Add seat availability checking
- Implement payment processing
