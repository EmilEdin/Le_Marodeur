# Le Marodeur - Restaurant Ordering System

This is a restaurant ordering system built using vanilla HTML, CSS, and JavaScript, following the Model-View-Controller (MVC) architecture. 

## Project Features
- **Menu Views**: Starters, light courses, main courses, desserts, beverages, set meals, and today's special.
- **Dietary Constraints Mapping**: Includes tags for vegan, vegetarian, allergens (lactose, gluten, onions), and non-alcoholic options.
- **Ordering System**: At-table single and group ordering.
- **Cart & Cost Computation**: See current order cost with and without tipping.
- **Dynamic Internationalization**: Three distinct interface languages switchable dynamically and remembered over the session.
- **Drag and Drop / Button Actions**: Alternative ways to interact with menu items.
- **Responsive Design**: Designed for 9" touch-screens and standard mobile phone screens without compromising functionality.

## Folder Structure
```text
Le_Marodeur/
├── css/
│   └── style.css            # Thematic design and layout
├── js/
│   ├── data/                # Mock databases and language dictionaries
│   │   ├── dictionary.js
│   │   └── menuData.js
│   ├── model/               # Data and State Layer
│   │   ├── MenuModel.js
│   │   └── CartModel.js
│   ├── view/                # Presentation Layer
│   │   ├── MenuView.js
│   │   └── CartView.js
│   ├── controller/          # Logic Layer
│   │   ├── MenuController.js
│   │   └── CartController.js
│   └── app.js               # Application Entry Point
├── index.html               # Main Interface
└── README.md                # Project Documentation
```

## Setup Instructions
1. Clone the repository.
2. Open `index.html` in any modern web browser to run the application (No external dependencies or servers required).

## Image and Icon Attribution
This application uses photos from [Unsplash](https://unsplash.com/) and icons from [Flaticon](https://www.flaticon.com/).

### Images
Give cred to everyone here?

### Icons
Would have in svg if flaticon allowed it for free version
Give cred to everyone here?

Bell: <a href="https://www.flaticon.com/free-icons/notification-bell" title="notification bell icons">Notification bell icons created by Pixel perfect - Flaticon</a>
